import csv
import os
from textwrap import dedent

# --- 1. Define Master Product Data (10 Products: Willard & Exide Car Batteries) ---
fieldnames = [
    'id', 'name', 'sku', 'category', 'brandName', 'ahCapacity', 'cca',
    'warrantyMonths', 'costPrice_INPUT', 'margin_CALC_FORMULA', 
    'sellingPrice_OUTPUT', 'isAGM', 'imagePath'
]

products = [
    {
        'id': 101, 'name': 'Willard 619 Maintenance-Free', 'sku': '619', 'category': 'Standard Automotive', 
        'brandName': 'Willard', 'ahCapacity': 43, 'cca': 325, 'warrantyMonths': 24, 
        'costPrice_INPUT': '1000.00', 'margin_CALC_FORMULA': '=I2*1.30', 'sellingPrice_OUTPUT': 'R 1,300.00', 
        'isAGM': 'FALSE', 'imagePath': '/images/willard-619.jpg'
    },
    {
        'id': 102, 'name': 'Willard 652 Maintenance-Free', 'sku': '652', 'category': 'Standard Automotive', 
        'brandName': 'Willard', 'ahCapacity': 70, 'cca': 590, 'warrantyMonths': 24, 
        'costPrice_INPUT': '2000.00', 'margin_CALC_FORMULA': '=I3*1.30', 'sellingPrice_OUTPUT': 'R 2,600.00', 
        'isAGM': 'FALSE', 'imagePath': '/images/willard-652.jpg'
    },
    {
        'id': 103, 'name': 'Willard 658 High Performance', 'sku': '658', 'category': 'Standard Automotive', 
        'brandName': 'Willard', 'ahCapacity': 68, 'cca': 600, 'warrantyMonths': 25, 
        'costPrice_INPUT': '2750.00', 'margin_CALC_FORMULA': '=I4*1.25', 'sellingPrice_OUTPUT': 'R 3,437.50', 
        'isAGM': 'FALSE', 'imagePath': '/images/willard-658.jpg'
    },
    {
        'id': 104, 'name': 'Willard 668 Commercial', 'sku': '668', 'category': 'Standard Automotive', 
        'brandName': 'Willard', 'ahCapacity': 90, 'cca': 720, 'warrantyMonths': 25, 
        'costPrice_INPUT': '3200.00', 'margin_CALC_FORMULA': '=I5*1.25', 'sellingPrice_OUTPUT': 'R 4,000.00', 
        'isAGM': 'FALSE', 'imagePath': '/images/willard-668.jpg'
    },
    {
        'id': 105, 'name': 'Willard 628 EFB Start/Stop', 'sku': '628', 'category': 'Performance AGM/EFB', 
        'brandName': 'Willard', 'ahCapacity': 70, 'cca': 680, 'warrantyMonths': 36, 
        'costPrice_INPUT': '3900.00', 'margin_CALC_FORMULA': '=I6*1.20', 'sellingPrice_OUTPUT': 'R 4,680.00', 
        'isAGM': 'TRUE', 'imagePath': '/images/willard-628-efb.jpg'
    },
    {
        'id': 201, 'name': 'Exide 646 Eco', 'sku': '646', 'category': 'Standard Automotive', 
        'brandName': 'Exide', 'ahCapacity': 55, 'cca': 380, 'warrantyMonths': 24, 
        'costPrice_INPUT': '1650.00', 'margin_CALC_FORMULA': '=I7*1.30', 'sellingPrice_OUTPUT': 'R 2,145.00', 
        'isAGM': 'FALSE', 'imagePath': '/images/exide-646.jpg'
    },
    {
        'id': 202, 'name': 'Exide 652 High Cycle', 'sku': '652', 'category': 'Standard Automotive', 
        'brandName': 'Exide', 'ahCapacity': 70, 'cca': 600, 'warrantyMonths': 24, 
        'costPrice_INPUT': '2550.00', 'margin_CALC_FORMULA': '=I8*1.25', 'sellingPrice_OUTPUT': 'R 3,187.50', 
        'isAGM': 'FALSE', 'imagePath': '/images/exide-652.jpg'
    },
    {
        'id': 203, 'name': 'Exide 658 AGM Performance', 'sku': '658', 'category': 'Performance AGM/EFB', 
        'brandName': 'Exide', 'ahCapacity': 72, 'cca': 720, 'warrantyMonths': 36, 
        'costPrice_INPUT': '4100.00', 'margin_CALC_FORMULA': '=I9*1.20', 'sellingPrice_OUTPUT': 'R 4,920.00', 
        'isAGM': 'TRUE', 'imagePath': '/images/exide-658-agm.jpg'
    },
    {
        'id': 204, 'name': 'Exide 668 AGM Premium', 'sku': '668', 'category': 'Performance AGM/EFB', 
        'brandName': 'Exide', 'ahCapacity': 95, 'cca': 850, 'warrantyMonths': 36, 
        'costPrice_INPUT': '4800.00', 'margin_CALC_FORMULA': '=I10*1.20', 'sellingPrice_OUTPUT': 'R 5,760.00', 
        'isAGM': 'TRUE', 'imagePath': '/images/exide-668-agm.jpg'
    },
    {
        'id': 301, 'name': 'Willard 646 Maintenance-Free', 'sku': '646', 'category': 'Standard Automotive', 
        'brandName': 'Willard', 'ahCapacity': 55, 'cca': 380, 'warrantyMonths': 24, 
        'costPrice_INPUT': '1700.00', 'margin_CALC_FORMULA': '=I11*1.30', 'sellingPrice_OUTPUT': 'R 2,210.00', 
        'isAGM': 'FALSE', 'imagePath': '/images/willard-646.jpg'
    }
]

csv_file_path = 'product_master_template.csv'

# --- 2. Write Data to CSV ---
try:
    with open(csv_file_path, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(products)
    print(f"CSV file created with {len(products)} products: {os.path.abspath(csv_file_path)}")
except Exception as e:
    print(f"An error occurred during CSV creation: {e}")

# --- 3. Conversion Logic (CSV to TypeScript) ---

output_dir = 'src/data'
output_file = os.path.join(output_dir, 'products.ts')

def read_csv_data(filepath):
    data = []
    with open(filepath, mode='r', newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            data.append(row)
    return data

def format_to_typescript(raw_data):
    ts_data_rows = []
    for row in raw_data:
        # Data conversion and mapping
        product = {
            "id": int(row['id']),
            "name": row['name'],
            "sku": row['sku'],
            "category": row['category'],
            "brandName": row['brandName'].replace(' ', ''), 
            "ahCapacity": int(row['ahCapacity']),
            "cca": int(row['cca']),
            "warrantyMonths": int(row['warrantyMonths']),
            "priceAnchor": row['sellingPrice_OUTPUT'],
            "isAGM": row['isAGM'].upper() == 'TRUE',
            "imagePath": row['imagePath'],
        }
        
        # Manually create the object string for precise TS formatting
        ts_object = dedent("""\
        {{
            id: {id},
            name: "{name}",
            sku: "{sku}",
            category: "{category}",
            brandName: "{brandName}",
            ahCapacity: {ahCapacity},
            cca: {cca},
            warrantyMonths: {warrantyMonths},
            priceAnchor: "{priceAnchor}",
            isAGM: {isAGM},
            imagePath: "{imagePath}",
        }}""".format(
            id=product['id'],
            name=product['name'],
            sku=product['sku'],
            category=product['category'],
            brandName=product['brandName'],
            ahCapacity=product['ahCapacity'],
            cca=product['cca'],
            warrantyMonths=product['warrantyMonths'],
            priceAnchor=product['priceAnchor'],
            isAGM=str(product['isAGM']).lower(),
            imagePath=product['imagePath']
        ))
        ts_data_rows.append(ts_object)

    ts_interface = dedent("""\
        export interface ProductCardData {
          id: number;
          name: string; 
          sku: string;
          category: string;
          brandName: string;
          ahCapacity: number; 
          cca: number; 
          warrantyMonths: number; 
          priceAnchor: string; // The displayed price string (e.g., 'R 1,200.00')
          isAGM: boolean; 
          imagePath: string;
        }""")

    ts_content = dedent("""\
        // src/data/products.ts
        // This file is generated automatically from product_master_template.csv

{ts_interface}

        export const ALL_PRODUCTS: ProductCardData[] = [
{data_rows}
        ];
    """).format(
        ts_interface=ts_interface,
        data_rows=",\n".join(ts_data_rows)
    )
    return ts_content

# --- 4. Main Execution (Convert and Write to TS) ---
try:
    raw_data_for_ts = read_csv_data(csv_file_path)
    ts_content = format_to_typescript(raw_data_for_ts)

    os.makedirs(output_dir, exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    print(f"TypeScript data file successfully created/updated at: {os.path.abspath(output_file)}")

except Exception as e:
    print(f"An error occurred during TypeScript conversion: {e}")