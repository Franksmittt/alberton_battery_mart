# C:\Users\User1\abm2\product_script_final.py - UPDATED CONTENT

import csv
import os
from textwrap import dedent
import math 

# --- WARRANTY CALCULATION FUNCTION ---
def calculate_warranty(brand, is_agm):
    """Calculates warranty based on brand and AGM status."""
    if brand == 'Willard':
        return 25
    if brand == 'Exide':
        return 36 if is_agm == 'TRUE' else 24
    if brand == 'Enertec':
        return 12
    return 24 # Default

# --- NEW: Define image paths based on your requested files ---
WILLARD_CAR_IMG = '/images/willard-619-car-battery-alberton.jpg'
EXIDE_CAR_IMG = '/images/exide-619-car-battery-alberton.jpg'
WILLARD_TRUCK_IMG = '/images/willard-696-truck-battery-alberton.jpg'
EXIDE_TRUCK_IMG = '/images/exide-696-truck-battery-alberton.jpg'
ENERTEC_IMG = '/images/stock-battery.jpg' 
DEFAULT_IMG = '/images/stock-battery.jpg'


# -------------------------------------------------------------------------
# --- CURATED MASTER PRODUCT LIST ---
# NOTE: warrantyMonths is set to 0. It will be correctly calculated by the script logic before final output.
# -------------------------------------------------------------------------

products = [
    # --- WILLARD AUTOMOTIVE (Car) ---
    {
        'id': 101, 'name': 'Willard 619', 'sku': '619', 'category': 'Standard Automotive', 
        'brandName': 'Willard', 'ahCapacity': 43, 'cca': 325, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 1,450.00', 'isAGM': 'FALSE', 'imagePath': WILLARD_CAR_IMG, 
        'popularFits': 'Toyota Tazz, VW Polo Vivo, Opel Corsa', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 108, 'name': 'Willard 628/9', 'sku': '628/9', 'category': 'Standard Automotive', 
        'brandName': 'Willard', 'ahCapacity': 50, 'cca': 335, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 1,600.00', 'isAGM': 'FALSE', 'imagePath': '/images/willard-628-car-battery-alberton.jpg', 
        'popularFits': 'Hyundai Grand i10, Renault Clio', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 110, 'name': 'Willard 646', 'sku': '646', 'category': 'Standard Automotive', 
        'brandName': 'Willard', 'ahCapacity': 55, 'cca': 380, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 1,900.00', 'isAGM': 'FALSE', 'imagePath': '/images/willard-646-car-battery-alberton.jpg', 
        'popularFits': 'Nissan NP200, Renault Sandero, Toyota Yaris', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 102, 'name': 'Willard 652', 'sku': '652', 'category': 'Standard Automotive', 
        'brandName': 'Willard', 'ahCapacity': 70, 'cca': 590, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 2,150.00', 'isAGM': 'FALSE', 'imagePath': '/images/willard-652-car-battery-alberton.jpg', 
        'popularFits': 'Toyota Hilux (Petrol), Ford Ranger (Diesel)', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 109, 'name': 'Willard 658', 'sku': '658', 'category': 'Standard Automotive', 
        'brandName': 'Willard', 'ahCapacity': 90, 'cca': 630, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 3,050.00', 'isAGM': 'FALSE', 'imagePath': '/images/willard-658-car-battery-alberton.jpg', 
        'popularFits': 'Toyota Land Cruiser, Heavy Duty Bakkies', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 104, 'name': 'Willard 668', 'sku': '668', 'category': 'Standard Automotive', 
        'brandName': 'Willard', 'ahCapacity': 80, 'cca': 590, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 2,950.00', 'isAGM': 'FALSE', 'imagePath': '/images/willard-668-car-battery-alberton.jpg', 
        'popularFits': 'Heavy Duty Petrol/Diesel SUV', 'isScrapPrice': 'TRUE'
    },
    
    # --- WILLARD TRUCK/COMMERCIAL ---
    {
        'id': 683, 'name': 'Willard 683C', 'sku': '683C', 'category': 'Truck & Commercial', 
        'brandName': 'Willard', 'ahCapacity': 115, 'cca': 690, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 4,100.00', 'isAGM': 'FALSE', 'imagePath': '/images/willard-683-truck-battery-alberton.jpg', 
        'popularFits': 'Commercial Truck', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 689, 'name': 'Willard 689C', 'sku': '689C', 'category': 'Truck & Commercial', 
        'brandName': 'Willard', 'ahCapacity': 132, 'cca': 810, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 4,850.00', 'isAGM': 'FALSE', 'imagePath': '/images/willard-689-truck-battery-alberton.jpg', 
        'popularFits': 'Commercial Truck', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 696, 'name': 'Willard 696C', 'sku': '696C', 'category': 'Truck & Commercial', 
        'brandName': 'Willard', 'ahCapacity': 180, 'cca': 1150, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 6,600.00', 'isAGM': 'FALSE', 'imagePath': '/images/willard-696-truck-battery-alberton.jpg', 
        'popularFits': 'Heavy Duty Truck', 'isScrapPrice': 'TRUE'
    },
    
    # --- EXIDE AUTOMOTIVE (Standard) ---
    {
        'id': 118, 'name': 'Exide 619CE', 'sku': '619CE', 'category': 'Standard Automotive', 
        'brandName': 'Exide', 'ahCapacity': 42, 'cca': 314, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 1,450.00', 'isAGM': 'FALSE', 'imagePath': '/images/exide-619-car-battery-alberton.jpg', 
        'popularFits': 'Toyota Tazz, VW Polo Vivo', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 114, 'name': 'Exide 628', 'sku': '628', 'category': 'Standard Automotive', 
        'brandName': 'Exide', 'ahCapacity': 48, 'cca': 385, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 1,600.00', 'isAGM': 'FALSE', 'imagePath': '/images/exide-628-car-battery-alberton.jpg', 
        'popularFits': 'Hyundai Grand i10, Ford Figo', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 113, 'name': 'Exide 646CE', 'sku': '646CE', 'category': 'Standard Automotive', 
        'brandName': 'Exide', 'ahCapacity': 58, 'cca': 451, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 1,900.00', 'isAGM': 'FALSE', 'imagePath': '/images/exide-646-car-battery-alberton.jpg', 
        'popularFits': 'Nissan NP200, Toyota Yaris', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 132, 'name': 'Exide 652PS', 'sku': '652PS', 'category': 'Standard Automotive', 
        'brandName': 'Exide', 'ahCapacity': 75, 'cca': 660, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 2,600.00', 'isAGM': 'FALSE', 'imagePath': '/images/exide-652-car-battery-alberton.jpg', 
        'popularFits': 'Toyota Hilux (Diesel), Hyundai Tucson', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 126, 'name': 'Exide 658C', 'sku': '658C', 'category': 'Standard Automotive', 
        'brandName': 'Exide', 'ahCapacity': 96, 'cca': 820, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 3,050.00', 'isAGM': 'FALSE', 'imagePath': '/images/exide-658-car-battery-alberton.jpg', 
        'popularFits': 'Heavy Duty 4x4, Land Cruiser', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 117, 'name': 'Exide 668', 'sku': '668', 'category': 'Standard Automotive', 
        'brandName': 'Exide', 'ahCapacity': 85, 'cca': 715, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 2,950.00', 'isAGM': 'FALSE', 'imagePath': '/images/exide-668-car-battery-alberton.jpg', 
        'popularFits': 'Premium SUV, Large Engines', 'isScrapPrice': 'TRUE'
    },
    
    # --- EXIDE PERFORMANCE (AGM) - 36 MONTH WARRANTY ---
    {
        'id': 143, 'name': 'Exide 646AGM', 'sku': '646AGM', 'category': 'Performance AGM/EFB', 
        'brandName': 'Exide', 'ahCapacity': 60, 'cca': 680, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 3,550.00', 'isAGM': 'TRUE', 'imagePath': '/images/exide-646agm-car-battery-alberton.jpg', 
        'popularFits': 'VW Polo TSI, Ford EcoSport (Start/Stop)', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 120, 'name': 'Exide 652AGM', 'sku': '652AGM', 'category': 'Performance AGM/EFB', 
        'brandName': 'Exide', 'ahCapacity': 70, 'cca': 760, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 4,250.00', 'isAGM': 'TRUE', 'imagePath': '/images/exide-652agm-car-battery-alberton.jpg', 
        'popularFits': 'Hyundai Tucson, VW Tiguan (Start/Stop)', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 136, 'name': 'Exide 658AGM', 'sku': '658AGM', 'category': 'Performance AGM/EFB', 
        'brandName': 'Exide', 'ahCapacity': 92, 'cca': 900, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 4,700.00', 'isAGM': 'TRUE', 'imagePath': '/images/exide-658agm-car-battery-alberton.jpg', 
        'popularFits': 'BMW, Mercedes, Audi (BMS Coding Required)', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 129, 'name': 'Exide 668AGM', 'sku': '668AGM', 'category': 'Performance AGM/EFB', 
        'brandName': 'Exide', 'ahCapacity': 80, 'cca': 800, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 4,400.00', 'isAGM': 'TRUE', 'imagePath': '/images/exide-668agm-car-battery-alberton.jpg', 
        'popularFits': 'BMW, Mercedes, Audi (BMS Coding Required)', 'isScrapPrice': 'TRUE'
    },
    
    # --- EXIDE TRUCK/COMMERCIAL ---
    {
        'id': 124, 'name': 'Exide 683C', 'sku': '683C', 'category': 'Truck & Commercial', 
        'brandName': 'Exide', 'ahCapacity': 115, 'cca': 690, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 4,100.00', 'isAGM': 'FALSE', 'imagePath': '/images/exide-683-truck-battery-alberton.jpg', 
        'popularFits': 'Commercial Truck', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 125, 'name': 'Exide 689C', 'sku': '689C', 'category': 'Truck & Commercial', 
        'brandName': 'Exide', 'ahCapacity': 132, 'cca': 810, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 4,850.00', 'isAGM': 'FALSE', 'imagePath': '/images/exide-689-truck-battery-alberton.jpg', 
        'popularFits': 'Commercial Truck', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 121, 'name': 'Exide 696C', 'sku': '696C', 'category': 'Truck & Commercial', 
        'brandName': 'Exide', 'ahCapacity': 180, 'cca': 1150, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 6,600.00', 'isAGM': 'FALSE', 'imagePath': '/images/exide-696-truck-battery-alberton.jpg', 
        'popularFits': 'Heavy Duty Truck', 'isScrapPrice': 'TRUE'
    },

    # --- ENERTEC MOTORCYCLE (IDs 154-185) - 12 MONTH WARRANTY ---
    {
        'id': 154, 'name': 'Enertec 12N10-3A', 'sku': '12N10-3A', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 11, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 860.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 155, 'name': 'Enertec 12N12A-4A-1', 'sku': '12N12A-4A-1', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 12, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 860.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 156, 'name': 'Enertec 12N14-3A', 'sku': '12N14-3A', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 14, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 1,000.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 157, 'name': 'Enertec 12N14-3B', 'sku': '12N14-3B', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 14, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 1,000.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 158, 'name': 'Enertec 12N5-3B', 'sku': '12N5-3B', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 5, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 400.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 159, 'name': 'Enertec 12N7-3B', 'sku': '12N7-3B', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 7, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 480.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 160, 'name': 'Enertec 12N7-4A', 'sku': '12N7-4A', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 7, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 520.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 161, 'name': 'Enertec 12N7A-3A', 'sku': '12N7A-3A', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 7, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 500.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 162, 'name': 'Enertec 12N9-3B', 'sku': '12N9-3B', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 8, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 600.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 163, 'name': 'Enertec 12N9-4M-1', 'sku': '12N9-4M-1', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 9, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 600.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 164, 'name': 'Enertec YB14LA-2', 'sku': 'YB14LA-2', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 14, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 1,000.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 165, 'name': 'Enertec YB16CL-B', 'sku': 'YB16CL-B', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 16, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 1,720.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 166, 'name': 'Enertec YB30CL-B', 'sku': 'YB30CL-B', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 30, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 2,380.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 167, 'name': 'Enertec YT12A-BS', 'sku': 'YT12A-BS', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 11, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 740.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 168, 'name': 'Enertec YT9B-4', 'sku': 'YT9B-4', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 9, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 640.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 169, 'name': 'Enertec YTX12-BS', 'sku': 'YTX12-BS', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 12, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 860.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 170, 'name': 'Enertec YTX14-BS', 'sku': 'YTX14-BS', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 12, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 940.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 171, 'name': 'Enertec YTX14AH-BS', 'sku': 'YTX14AH-BS', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 14, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 1,080.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 172, 'name': 'Enertec YTX14L-BS', 'sku': 'YTX14L-BS', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 14, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 1,000.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 173, 'name': 'Enertec YTX16-BS', 'sku': 'YTX16-BS', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 16, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 1,320.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 174, 'name': 'Enertec YTX20-BS', 'sku': 'YTX20-BS', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 20, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 1,480.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 175, 'name': 'Enertec YTX20HL-BS', 'sku': 'YTX20HL-BS', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 20, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 1,340.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 176, 'name': 'Enertec YTX20L-BS', 'sku': 'YTX20L-BS', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 20, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 1,500.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 177, 'name': 'Enertec YTX30L', 'sku': 'YTX30L', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 30, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 2,460.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 178, 'name': 'Enertec YTX4L-BS', 'sku': 'YTX4L-BS', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 4, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 340.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 179, 'name': 'Enertec YTX5L-BS', 'sku': 'YTX5L-BS', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 5, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 440.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 180, 'name': 'Enertec YTX6.5L-BS', 'sku': 'YTX6.5L-BS', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 7, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 460.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 181, 'name': 'Enertec YTX7A-BS', 'sku': 'YTX7A-BS', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 6, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 520.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 182, 'name': 'Enertec YTX7L-BS', 'sku': 'YTX7L-BS', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 6, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 559.99', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 183, 'name': 'Enertec YTX9A-BS', 'sku': 'YTX9A-BS', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 8, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 600.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 184, 'name': 'Enertec YTZ10S', 'sku': 'YTZ10S', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 9, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 700.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
    {
        'id': 185, 'name': 'Enertec YTZ7S', 'sku': 'YTZ7S', 'category': 'Motorcycle', 
        'brandName': 'Enertec', 'ahCapacity': 7, 'cca': 0, 'warrantyMonths': 0, 
        'sellingPrice_OUTPUT': 'R 540.00', 'isAGM': 'TRUE', 'imagePath': ENERTEC_IMG, 
        'popularFits': 'Motorcycle', 'isScrapPrice': 'TRUE'
    },
]

# --- IMPORTANT: The remaining script logic (which applies the warranty) is required below ---

# Define the utility functions (assuming they are identical to your previous script)
def get_seo_subtitle(product):
    """Generates the subtitle for SEO/Display use based on product specs."""
    is_agm_text = 'AGM ' if product['isAGM'] == 'TRUE' else ''
    category_text = 'Truck Battery' if product['category'] == 'Truck & Commercial' else 'Car Battery'
    if product['category'] == 'Motorcycle':
        category_text = 'Motorcycle Battery'
    
    return f"{is_agm_text}{product['brandName']} {category_text} ({product['ahCapacity']}Ah)"

def read_csv_data(file_path):
    """Reads data from the CSV file."""
    data = []
    try:
        with open(file_path, mode='r', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                data.append(row)
    except FileNotFoundError:
        print(f"Warning: CSV file not found at {file_path}. Skipping CSV read.")
    return data

def format_to_typescript(data):
    """Converts the product list (after processing) to a TypeScript file string."""
    ts_content = dedent(f"""
        // src/data/products.ts
        //
        // THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT THIS FILE MANUALLY.
        // Last Generated: {os.path.basename(__file__)} on {os.path.getmtime(__file__)}
        
        export interface ProductCardData {{
          id: number;
          name: string;
          sku: string;
          category: 'Standard Automotive' | 'Performance AGM/EFB' | 'Truck & Commercial' | 'Motorcycle' | 'Deep Cycle';
          brandName: 'Willard' | 'Exide' | 'Enertec' | 'Raylite';
          ahCapacity: number;
          cca: number;
          warrantyMonths: number;
          sellingPrice_OUTPUT: string;
          isAGM: boolean;
          imagePath: string;
          popularFits: string;
          isScrapPrice: boolean;
          seoSubtitle: string; 
          seoDescription: string;
        }}
        
        export const ALL_PRODUCTS: ProductCardData[] = [
    """)

    for p in data:
        is_agm = p['isAGM'] == 'TRUE'
        
        # --- APPLY NEW WARRANTY LOGIC ---
        warranty = calculate_warranty(p['brandName'], p['isAGM'])

        # Format price and create properties
        try:
            # Attempt to convert to float for proper formatting, then revert to string output
            price_str = p['sellingPrice_OUTPUT'].replace('R', '').replace(',', '').strip()
            price_val = float(price_str)
            selling_price_output = f"R {price_val:,.2f}".replace(',', ' ')
        except ValueError:
            selling_price_output = p['sellingPrice_OUTPUT']
        
        # Calculate CCA as a string if empty
        cca_value = p['cca'] if p['cca'] else 'N/A'
        
        # Generate new SEO fields
        subtitle = get_seo_subtitle(p)
        description = f"{p['brandName']} {p['name']}: {p['category']} Battery. Features {p['ahCapacity']}Ah capacity and a {warranty}-Month Warranty."

        ts_content += dedent(f"""
            {{
                id: {int(p['id'])},
                name: '{p['name']}',
                sku: '{p['sku']}',
                category: '{p['category']}',
                brandName: '{p['brandName']}',
                ahCapacity: {int(p['ahCapacity'])},
                cca: {p['cca']},
                warrantyMonths: {warranty},
                sellingPrice_OUTPUT: '{selling_price_output}',
                isAGM: {is_agm},
                imagePath: '{p['imagePath']}',
                popularFits: '{p['popularFits']}',
                isScrapPrice: {p['isScrapPrice'] == 'TRUE'},
                seoSubtitle: '{subtitle}',
                seoDescription: '{description}',
            }},
        """)

    ts_content += '];\n'
    return ts_content

# --- Main Script Execution ---

# 1. Update list with correct warranty fields (and convert types)
processed_products = []
for p in products:
    p['warrantyMonths'] = calculate_warranty(p['brandName'], p['isAGM'])
    p['isAGM'] = p['isAGM'] == 'TRUE'  # Convert string to boolean for cleaner processing
    p['isScrapPrice'] = p['isScrapPrice'] == 'TRUE'
    # Ensure CCA is a number, setting 0 for non-specified (motorcycle)
    try:
        p['cca'] = int(p['cca'])
    except:
        p['cca'] = 0
    
    # Store processed product
    processed_products.append(p)


# 2. Write to CSV (Optional, but good for tracking)
CSV_FILE_PATH = 'product_master_template.csv'
fieldnames = list(processed_products[0].keys()) if processed_products else []
try:
    with open(CSV_FILE_PATH, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(processed_products)
except Exception as e:
    print(f"Error writing CSV: {e}")

# 3. Generate TypeScript file
TS_FILE_PATH = 'src/data/products.ts'
ts_output = format_to_typescript(products)
try:
    with open(TS_FILE_PATH, 'w', encoding='utf-8') as f:
        f.write(ts_output)
    print(f"Successfully generated {TS_FILE_PATH} with {len(products)} products.")
except Exception as e:
    print(f"Error writing TypeScript file: {e}")

# --- END OF product_script_final.py ---