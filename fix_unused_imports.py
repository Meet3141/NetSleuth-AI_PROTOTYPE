import os

files_to_fix = {
    'src/pages/Alerts.tsx': [('Activity,', ''), (', Bell', ''), (' Bell,', '')],
    'src/pages/Correlation.tsx': [('useMemo,', ''), (', useMemo', ''), ('useMemo', '')],
    'src/pages/InvestigationWorkspace.tsx': [('PageHeader,', ''), (', PageHeader', ''), ('StatusBadge,', ''), (', StatusBadge', ''), ('Cpu,', ''), (', Cpu', ''), ('cn,', ''), (', cn', '')],
    'src/pages/PacketIntelligence.tsx': [('ExternalLink,', ''), (', ExternalLink', ''), ('Network,', ''), (', Network', ''), ('Shield,', ''), (', Shield', ''), ('Column,', ''), (', Column', '')]
}

for filepath, replacements in files_to_fix.items():
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        for old, new in replacements:
            content = content.replace(old, new)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print("Fixed unused imports.")
