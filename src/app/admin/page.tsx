'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UnitechPricelist } from '@/components/admin/UnitechPricelist';
import { UnitechStagedProducts } from '@/components/admin/UnitechStagedProducts';
import { ProductCardData } from '@/data/products';
import { UNITECH_PRICELIST } from '@/data/unitech-pricelist';
import { LogOut, Save, Search } from 'lucide-react';

type AdminTab = 'catalogue' | 'unitech';

const TABS: { id: AdminTab; label: string }[] = [
  { id: 'catalogue', label: 'Catalogue' },
  { id: 'unitech', label: 'Unitech' },
];

const CATEGORY_ORDER = [
  'Standard Automotive',
  'Performance AGM/EFB',
  'Truck & Commercial',
  'Motorcycle',
  'Deep Cycle',
] as const;

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('catalogue');
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [priceDrafts, setPriceDrafts] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error' | ''>('');
  const router = useRouter();

  const loadProducts = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/products');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = (await res.json()) as ProductCardData[];
      setProducts(data);
      setPriceDrafts(
        Object.fromEntries(data.map((product) => [product.id, product.sellingPrice_OUTPUT]))
      );
    } catch (error) {
      console.error('Failed to load products:', error);
      setStatusType('error');
      setStatusMessage('Could not load products. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/check');
      const data = await res.json();
      if (!data.authenticated) {
        router.push('/admin/login');
        return;
      }
      await loadProducts();
    } catch {
      router.push('/admin/login');
    }
  }, [loadProducts, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const brands = useMemo(
    () => Array.from(new Set(products.map((product) => product.brandName))).sort(),
    [products]
  );

  const dirtyUpdates = useMemo(() => {
    return products
      .filter((product) => priceDrafts[product.id] !== product.sellingPrice_OUTPUT)
      .map((product) => ({
        id: product.id,
        sellingPrice_OUTPUT: priceDrafts[product.id],
      }));
  }, [priceDrafts, products]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      if (brandFilter !== 'all' && product.brandName !== brandFilter) {
        return false;
      }
      if (!query) {
        return true;
      }
      return (
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.brandName.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    });
  }, [brandFilter, products, search]);

  const groupedProducts = useMemo(() => {
    const groups = new Map<string, ProductCardData[]>();
    for (const category of CATEGORY_ORDER) {
      groups.set(category, []);
    }

    for (const product of filteredProducts) {
      const list = groups.get(product.category) ?? [];
      list.push(product);
      groups.set(product.category, list);
    }

    return Array.from(groups.entries()).filter(([, items]) => items.length > 0);
  }, [filteredProducts]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handlePriceChange = (id: number, value: string) => {
    setPriceDrafts((current) => ({ ...current, [id]: value }));
    setStatusMessage('');
    setStatusType('');
  };

  const handleSave = async () => {
    if (dirtyUpdates.length === 0) {
      setStatusType('error');
      setStatusMessage('No price changes to save.');
      return;
    }

    setSaving(true);
    setStatusMessage('');
    setStatusType('');

    try {
      const res = await fetch('/api/admin/products/prices', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates: dirtyUpdates }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatusType('error');
        setStatusMessage(data.error || 'Failed to save prices.');
        return;
      }

      setStatusType('success');
      setStatusMessage(data.message || 'Prices saved and website updated.');
      await loadProducts();
    } catch {
      setStatusType('error');
      setStatusMessage('Error saving prices. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Price Manager</h1>
            <p className="text-muted-foreground mt-1">
              {activeTab === 'catalogue'
                ? `${products.length} products · change a price, then click Save Changes`
                : `${UNITECH_PRICELIST.length} Unitech supplier lines · read-only, not on the website`}
            </p>
          </div>
          <div className="flex gap-2">
            {activeTab === 'catalogue' && (
              <Button onClick={handleSave} disabled={saving || dirtyUpdates.length === 0}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : `Save Changes${dirtyUpdates.length ? ` (${dirtyUpdates.length})` : ''}`}
              </Button>
            )}
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div role="tablist" aria-label="Back office sections" className="flex gap-1 border-b">
          {TABS.map((tab) => {
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`admin-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`admin-panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                  selected
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'unitech' ? (
          <div role="tabpanel" id="admin-panel-unitech" aria-labelledby="admin-tab-unitech" className="space-y-6">
            <UnitechPricelist />
            <UnitechStagedProducts />
          </div>
        ) : (
        <div role="tabpanel" id="admin-panel-catalogue" aria-labelledby="admin-tab-catalogue" className="space-y-6">
        {statusMessage && (
          <div
            className={`rounded-md p-3 text-sm ${
              statusType === 'success'
                ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-200'
            }`}
          >
            {statusMessage}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Find a product</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search by name, SKU, brand, or category"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="h-10 rounded-md border border-input bg-background px-3"
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
            >
              <option value="all">All brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>

        {groupedProducts.map(([category, items]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle>
                {category} <span className="text-muted-foreground font-normal">({items.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="p-2 font-semibold">SKU</th>
                      <th className="p-2 font-semibold">Product</th>
                      <th className="p-2 font-semibold">Brand</th>
                      <th className="p-2 font-semibold w-48">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((product) => {
                        const isDirty = priceDrafts[product.id] !== product.sellingPrice_OUTPUT;
                        return (
                          <tr
                            key={product.id}
                            className={`border-b hover:bg-muted/40 ${isDirty ? 'bg-amber-50/70 dark:bg-amber-900/10' : ''}`}
                          >
                            <td className="p-2 font-mono">{product.sku}</td>
                            <td className="p-2">{product.name}</td>
                            <td className="p-2">{product.brandName}</td>
                            <td className="p-2">
                              <Input
                                value={priceDrafts[product.id] ?? ''}
                                onChange={(e) => handlePriceChange(product.id, e.target.value)}
                                placeholder="R 1 450.00 or P.O.A"
                                className={isDirty ? 'border-amber-500' : ''}
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredProducts.length === 0 && (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              No products match your search.
            </CardContent>
          </Card>
        )}
        </div>
        )}
      </div>
    </div>
  );
}
