const fetch = require('node-fetch');

// Los secrets se configuran en Netlify Dashboard
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GIST_ID = process.env.GIST_ID;

exports.handler = async (event, context) => {
    // Habilitar CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };

    // Manejar preflight OPTIONS
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        if (event.httpMethod === 'GET' && event.path.startsWith('/.netlify/functions/api/read/')) {
            // Leer archivo
            const filename = event.path.split('/').pop();
            const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
                headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
            });
            
            if (!response.ok) {
                return { statusCode: response.status, headers, body: JSON.stringify({ error: 'Error al leer Gist' }) };
            }
            
            const gist = await response.json();
            const content = gist.files[filename]?.content || '{}';
            
            return { 
                statusCode: 200, 
                headers,
                body: content 
            };
        }

        if (event.httpMethod === 'POST' && event.path === '/.netlify/functions/api/write') {
            // Guardar archivos
            const files = JSON.parse(event.body);
            
            const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ files })
            });
            
            if (!response.ok) {
                return { statusCode: response.status, headers, body: JSON.stringify({ error: 'Error al guardar' }) };
            }
            
            return { 
                statusCode: 200, 
                headers,
                body: JSON.stringify({ success: true }) 
            };
        }

        return { statusCode: 404, headers, body: JSON.stringify({ error: 'Ruta no encontrada' }) };
    } catch (error) {
        console.error('Error:', error);
        return { 
            statusCode: 500, 
            headers,
            body: JSON.stringify({ error: 'Error interno del servidor' }) 
        };
    }
};