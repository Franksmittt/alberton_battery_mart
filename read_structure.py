import os

# --- Configuration ---

# The script automatically sets the project root to the directory it is located in.
# This means if you place this script in "C:\Users\User1\abm2", that will be the root.
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

# Set the name for the output file
OUTPUT_FILENAME = "abm2_summary.txt" 

# Get the name of this script file to exclude it from the scan
SCRIPT_NAME = os.path.basename(__file__)

# Folders to completely ignore during the scan (as you requested)
EXCLUDE_DIRS = [
    'node_modules',
    '.next',
    '.git',          # Good to keep excluding
    '__pycache__'    # Good to keep excluding
]

# File extensions to ignore (images, compiled files, etc.)
EXCLUDE_EXTENSIONS = (
    '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.ico', # Images
    '.bin', '.dat', '.dll', '.exe', '.obj', '.so', '.wasm',  # Binaries/Compiled
    '.zip', '.rar', '.7z', '.tar', '.gz',                    # Archives
    '.lock'                                                  # Lock files
)

# Individual files to always ignore
# This list now automatically includes this script and its output file.
EXCLUDE_FILES = [
    OUTPUT_FILENAME, 
    SCRIPT_NAME,
    'pnpm-lock.yaml' # Kept from your previous script, good for Node projects
]

# --- Core Logic ---

def generate_file_tree(root_dir):
    """Generates a string representation of the file tree, excluding specific paths."""
    tree_lines = [f"📁 **PROJECT FILE TREE: {os.path.basename(root_dir)}**"]

    for root, dirs, files in os.walk(root_dir):
        # Modify dirs in-place to skip excluded folders
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        
        # Calculate the current level
        level = root.replace(root_dir, '').count(os.sep)
        indent = '│   ' * level

        # Add the directory to the tree
        if root != root_dir:
            dir_name = os.path.basename(root)
            tree_lines.append(f"{indent}├── 📁 {dir_name}")
            indent = '│   ' * (level + 1)
        
        # Add files
        for file in sorted(files):
            # Skip excluded files/extensions
            if file.lower() in EXCLUDE_FILES or file.lower().endswith(EXCLUDE_EXTENSIONS):
                continue
            
            tree_lines.append(f"{indent}├── 📄 {file}")
    
    return "\n".join(tree_lines) + "\n\n"

def get_file_contents(root_dir):
    """Iterates through files and reads their content."""
    content_output = []
    
    for root, dirs, files in os.walk(root_dir):
        # Skip excluded folders
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        
        for file in sorted(files):
            file_path = os.path.join(root, file)
            
            # Skip excluded files/extensions
            if file.lower() in EXCLUDE_FILES or file.lower().endswith(EXCLUDE_EXTENSIONS):
                continue
            
            # Try to read the file content
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Format the file path and content (as you requested)
                content_output.append("-" * 80)
                content_output.append(f"📄 FILE PATH: {file_path}")
                content_output.append("-" * 80)
                content_output.append(content)
                content_output.append("\n\n") 

            except UnicodeDecodeError:
                # File is likely binary, skip it
                print(f"Skipping binary/unreadable file: {file_path}")
            except Exception as e:
                print(f"Error reading file {file_path}: {e}")

    return "".join(content_output)

def main():
    """Main function to run the script."""
    # The output path will be inside the PROJECT_ROOT
    output_path = os.path.join(PROJECT_ROOT, OUTPUT_FILENAME)

    print(f"Scanning project root: {PROJECT_ROOT}")
    
    # 1. Generate the file tree
    tree_section = generate_file_tree(PROJECT_ROOT)
    
    # 2. Get the content of all included files
    content_section = get_file_contents(PROJECT_ROOT)
    
    # 3. Write everything to the output file
    try:
        with open(output_path, 'w', encoding='utf-8') as outfile:
            outfile.write(tree_section)
            outfile.write("=" * 100 + "\n\n")
            outfile.write("📄 **INDIVIDUAL FILE CONTENTS**\n\n")
            outfile.write("=" * 100 + "\n\n")
            outfile.write(content_section)
        
        print(f"\n✅ Successfully created output file: {output_path}")

    except Exception as e:
        print(f"\n❌ An error occurred while writing the output file: {e}")

if __name__ == "__main__":
    main()