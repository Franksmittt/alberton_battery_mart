#!/usr/bin/env bash
set -euo pipefail

BASE="http://localhost:3005"
COOKIE_JAR="/tmp/admin-test-cookies.txt"
TEST_PRODUCT_ID=101
NEW_PRICE="R 9 999.99"
ORIGINAL_PRICE=""

echo "=== Admin Price Panel E2E Tests ==="

# 1. Wrong password should fail
echo -n "Test 1: Wrong password rejected... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/admin/login" \
  -H "Content-Type: application/json" \
  -d '{"password":"wrong-password"}')
if [ "$STATUS" = "401" ]; then
  echo "PASS"
else
  echo "FAIL (got $STATUS)"
  exit 1
fi

# 2. Correct password should succeed
echo -n "Test 2: Login with admin@abm... "
rm -f "$COOKIE_JAR"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -c "$COOKIE_JAR" -X POST "$BASE/api/admin/login" \
  -H "Content-Type: application/json" \
  -d '{"password":"admin@abm"}')
if [ "$STATUS" = "200" ]; then
  echo "PASS"
else
  echo "FAIL (got $STATUS)"
  exit 1
fi

# 3. Auth check
echo -n "Test 3: Session authenticated... "
AUTH=$(curl -s -b "$COOKIE_JAR" "$BASE/api/admin/check" | grep -o '"authenticated":true' || true)
if [ -n "$AUTH" ]; then
  echo "PASS"
else
  echo "FAIL"
  exit 1
fi

# 4. Load all products
echo -n "Test 4: Load all products... "
PRODUCTS_JSON=$(curl -s -b "$COOKIE_JAR" "$BASE/api/admin/products")
COUNT=$(echo "$PRODUCTS_JSON" | python3 -c "import sys,json; print(len(json.load(sys.stdin)))")
if [ "$COUNT" -ge 171 ]; then
  echo "PASS ($COUNT products)"
else
  echo "FAIL (only $COUNT products)"
  exit 1
fi

# 5. Get original price from public API
echo -n "Test 5: Read original public price... "
ORIGINAL_PRICE=$(curl -s "$BASE/api/products" | python3 -c "
import sys, json
products = json.load(sys.stdin)
p = next(x for x in products if x['id'] == $TEST_PRODUCT_ID)
print(p['sellingPrice_OUTPUT'])
")
if [ -n "$ORIGINAL_PRICE" ]; then
  echo "PASS ($ORIGINAL_PRICE)"
else
  echo "FAIL"
  exit 1
fi

# 6. Unauthorized price update should fail
echo -n "Test 6: Unauthorized save blocked... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X PATCH "$BASE/api/admin/products/prices" \
  -H "Content-Type: application/json" \
  -d "{\"updates\":[{\"id\":$TEST_PRODUCT_ID,\"sellingPrice_OUTPUT\":\"$NEW_PRICE\"}]}")
if [ "$STATUS" = "401" ]; then
  echo "PASS"
else
  echo "FAIL (got $STATUS)"
  exit 1
fi

# 7. Save new price
echo -n "Test 7: Save new price... "
SAVE_RESULT=$(curl -s -b "$COOKIE_JAR" -X PATCH "$BASE/api/admin/products/prices" \
  -H "Content-Type: application/json" \
  -d "{\"updates\":[{\"id\":$TEST_PRODUCT_ID,\"sellingPrice_OUTPUT\":\"$NEW_PRICE\"}]}")
UPDATED=$(echo "$SAVE_RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('updated',0))")
if [ "$UPDATED" = "1" ]; then
  echo "PASS"
else
  echo "FAIL ($SAVE_RESULT)"
  exit 1
fi

# 8. Verify public API reflects new price
echo -n "Test 8: Public API shows new price... "
sleep 1
PUBLIC_PRICE=$(curl -s "$BASE/api/products" | python3 -c "
import sys, json
products = json.load(sys.stdin)
p = next(x for x in products if x['id'] == $TEST_PRODUCT_ID)
print(p['sellingPrice_OUTPUT'])
")
if [ "$PUBLIC_PRICE" = "R 9 999.99" ]; then
  echo "PASS"
else
  echo "FAIL (got $PUBLIC_PRICE)"
  exit 1
fi

# 9. Verify product page HTML shows new price
echo -n "Test 9: Product page shows new price... "
PAGE_HTML=$(curl -s "$BASE/products/id/$TEST_PRODUCT_ID")
if echo "$PAGE_HTML" | grep -q "R 9 999.99"; then
  echo "PASS"
else
  echo "FAIL"
  exit 1
fi

# 10. Verify data/products.json was updated on disk
echo -n "Test 10: products.json updated on disk... "
DISK_PRICE=$(python3 -c "
import json
with open('data/products.json') as f:
    products = json.load(f)
p = next(x for x in products if x['id'] == $TEST_PRODUCT_ID)
print(p['sellingPrice_OUTPUT'])
")
if [ "$DISK_PRICE" = "R 9 999.99" ]; then
  echo "PASS"
else
  echo "FAIL (got $DISK_PRICE)"
  exit 1
fi

# 11. Restore original price
echo -n "Test 11: Restore original price... "
curl -s -b "$COOKIE_JAR" -X PATCH "$BASE/api/admin/products/prices" \
  -H "Content-Type: application/json" \
  -d "{\"updates\":[{\"id\":$TEST_PRODUCT_ID,\"sellingPrice_OUTPUT\":\"$ORIGINAL_PRICE\"}]}" > /dev/null
RESTORED=$(curl -s "$BASE/api/products" | python3 -c "
import sys, json
products = json.load(sys.stdin)
p = next(x for x in products if x['id'] == $TEST_PRODUCT_ID)
print(p['sellingPrice_OUTPUT'])
")
if [ "$RESTORED" = "$ORIGINAL_PRICE" ]; then
  echo "PASS"
else
  echo "FAIL (got $RESTORED, expected $ORIGINAL_PRICE)"
  exit 1
fi

# 12. Admin login page loads
echo -n "Test 12: Admin login page loads... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/admin/login")
if [ "$STATUS" = "200" ]; then
  echo "PASS"
else
  echo "FAIL"
  exit 1
fi

# 13. Admin page loads (HTML shell)
echo -n "Test 13: Admin page loads... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/admin")
if [ "$STATUS" = "200" ]; then
  echo "PASS"
else
  echo "FAIL"
  exit 1
fi

echo ""
echo "=== ALL 13 TESTS PASSED ==="
