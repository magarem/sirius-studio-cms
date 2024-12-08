import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { nodes } = body;

        if (!nodes) {
            throw new Error('Nenhum dado fornecido');
        }

        const filePath = path.resolve('server/data/nodes.json');
        await fs.writeFile(filePath, JSON.stringify(nodes, null, 2), 'utf-8');
        return { status: 200, message: 'Árvore salva com sucesso!' };
    } catch (error) {
        console.error('Erro ao salvar a árvore:', error);
        return { status: 500, message: 'Erro interno do servidor' };
    }
});
