import os
import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Fix types imports: import { Type1, Type2 } from '../types' -> import type { Type1, Type2 } from '../types'
    content = re.sub(r"import\s+{([^}]+)}\s+from\s+['\"]../types['\"];", r"import type {\1} from '../types';", content)
    
    # 2. Fix @xyflow/react node/edge imports
    content = content.replace("import { ReactFlow, Background, Controls, MarkerType, Node, Edge } from '@xyflow/react';", 
                              "import { ReactFlow, Background, Controls, MarkerType } from '@xyflow/react';\nimport type { Node, Edge } from '@xyflow/react';")
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.ts', '.tsx')):
            fix_file(os.path.join(root, file))

print("Fixed type imports.")
