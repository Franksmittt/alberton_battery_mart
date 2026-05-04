'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductCardData } from '@/data/products';
import { Plus, Edit, Trash2, LogOut, Save, X } from 'lucide-react';

export default function AdminPage() {
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<ProductCardData | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<ProductCardData>>({});
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/check');
      const data = await res.json();
      if (!data.authenticated) {
        router.push('/admin/login');
        return;
      }
      loadProducts();
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handleEdit = (product: ProductCardData) => {
    setEditingProduct(product);
    setFormData(product);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      id: 0,
      name: '',
      sku: '',
      category: 'Standard Automotive',
      brandName: 'Willard',
      ahCapacity: 0,
      cca: 0,
      warrantyMonths: 24,
      sellingPrice_OUTPUT: 'R 0.00',
      isAGM: false,
      imagePath: '/images/stock-battery.jpg',
      popularFits: '',
      isScrapPrice: true,
      seoSubtitle: '',
      seoDescription: '',
    });
    setIsAdding(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        loadProducts();
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      alert('Error deleting product');
    }
  };

  const handleSave = async () => {
    try {
      const url = '/api/admin/products';
      const method = isAdding ? 'POST' : 'PUT';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setEditingProduct(null);
        setIsAdding(false);
        setFormData({});
        loadProducts();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save product');
      }
    } catch (error) {
      alert('Error saving product');
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setIsAdding(false);
    setFormData({});
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Product Management</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="mb-4">
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Product
          </Button>
        </div>

        {(isAdding || editingProduct) && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{isAdding ? 'Add New Product' : 'Edit Product'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>ID</Label>
                  <Input
                    type="number"
                    value={formData.id || ''}
                    onChange={(e) => setFormData({ ...formData, id: parseInt(e.target.value) })}
                    disabled={!isAdding}
                  />
                </div>
                <div>
                  <Label>Name *</Label>
                  <Input
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>SKU *</Label>
                  <Input
                    value={formData.sku || ''}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Category *</Label>
                  <select
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={formData.category || 'Standard Automotive'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  >
                    <option>Standard Automotive</option>
                    <option>Performance AGM/EFB</option>
                    <option>Truck & Commercial</option>
                    <option>Motorcycle</option>
                    <option>Deep Cycle</option>
                  </select>
                </div>
                <div>
                  <Label>Brand *</Label>
                  <select
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={formData.brandName || 'Willard'}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value as any })}
                  >
                    <option>Willard</option>
                    <option>Exide</option>
                    <option>Enertec</option>
                    <option>Raylite</option>
                    <option>Power Plus</option>
                    <option>Eco Plus</option>
                  </select>
                </div>
                <div>
                  <Label>Ah Capacity *</Label>
                  <Input
                    type="number"
                    value={formData.ahCapacity || ''}
                    onChange={(e) => setFormData({ ...formData, ahCapacity: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label>CCA</Label>
                  <Input
                    type="number"
                    value={formData.cca || ''}
                    onChange={(e) => setFormData({ ...formData, cca: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Warranty (Months) *</Label>
                  <Input
                    type="number"
                    value={formData.warrantyMonths || ''}
                    onChange={(e) => setFormData({ ...formData, warrantyMonths: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label>Price (e.g., R 1 450.00) *</Label>
                  <Input
                    value={formData.sellingPrice_OUTPUT || ''}
                    onChange={(e) => setFormData({ ...formData, sellingPrice_OUTPUT: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Image Path *</Label>
                  <Input
                    value={formData.imagePath || ''}
                    onChange={(e) => setFormData({ ...formData, imagePath: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Popular Fits</Label>
                  <Input
                    value={formData.popularFits || ''}
                    onChange={(e) => setFormData({ ...formData, popularFits: e.target.value })}
                  />
                </div>
                <div>
                  <Label>SEO Subtitle *</Label>
                  <Input
                    value={formData.seoSubtitle || ''}
                    onChange={(e) => setFormData({ ...formData, seoSubtitle: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>SEO Description *</Label>
                  <Textarea
                    value={formData.seoDescription || ''}
                    onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                    required
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isAGM"
                    checked={formData.isAGM || false}
                    onChange={(e) => setFormData({ ...formData, isAGM: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="isAGM">Is AGM</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isScrapPrice"
                    checked={formData.isScrapPrice || false}
                    onChange={(e) => setFormData({ ...formData, isScrapPrice: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="isScrapPrice">Is Scrap Price</Label>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>All Products ({products.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">ID</th>
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">SKU</th>
                    <th className="text-left p-2">Brand</th>
                    <th className="text-left p-2">Category</th>
                    <th className="text-left p-2">Price</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-muted/50">
                      <td className="p-2">{product.id}</td>
                      <td className="p-2">{product.name}</td>
                      <td className="p-2">{product.sku}</td>
                      <td className="p-2">{product.brandName}</td>
                      <td className="p-2">{product.category}</td>
                      <td className="p-2">{product.sellingPrice_OUTPUT}</td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(product)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

