import { NextResponse } from 'next/server';
// import fs from 'fs';
import type { CardMetadata } from '../../../app/designelements/components/math-cards/utils/card-loader';
import fs from 'fs';
import path from 'path';

// Map component file names to readable titles and descriptions
// const componentMeta: Record<string, { title: string, description: string, color: string }> = {
//     'topology-explorer': {
//         title: 'Topology Explorer',
//         description: 'Study properties of space that are preserved under continuous deformations.',
//         color: 'bg-gradient-to-br from-emerald-900 to-teal-900'
//     },
//     // ... other meta data

// };

async function generateCardConfigs(): Promise<CardMetadata[]> {
    const mathCardDirectory = path.join(process.cwd(), 'src', 'app', 'math');
    const cardDirectories = fs.readdirSync(mathCardDirectory, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    const cards: CardMetadata[] = [];

    for (const cardDirectory of cardDirectories) {
        try {
            const metaFilePath = path.join(mathCardDirectory, cardDirectory, 'meta.json');
            const metaContent = fs.readFileSync(metaFilePath, 'utf-8');
            const meta = JSON.parse(metaContent);

            if (meta.enabled) {
                cards.push({
                    id: meta.id,
                    title: meta.title,
                    description: meta.description,
                    color: meta.color,
                    icon: meta.icon,
                    category: meta.category,
                    enabled: meta.enabled,
                    lastUpdated: meta.lastUpdated
                });
            }
        } catch (error) {
            console.error(`Error loading meta.json for ${cardDirectory}:`, error);
        }
    }

    return cards;
}

export async function GET() {
    try {
        const cards = await generateCardConfigs();
        return NextResponse.json({ cards });
    } catch (error) {
        console.error('Error loading math cards:', error);
        return NextResponse.json({ error: 'Failed to load math cards' }, { status: 500 });
    }
}
