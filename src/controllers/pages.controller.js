import {pool} from '../db.js';

// POST ROUTES

export const postPage = async (req, res) => {
    const { nombre, url } = req.body;

    try {
        const response = await pool.query('INSERT INTO paginas (nombre, url) VALUES (?, ?)', [nombre, url]);
        res.json({
            message: 'Page Added successfully',
            body: {
                page: {nombre},
                url: {url}
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Something goes wrong',
            body: {}
        })
    }
}

export const postMenuItems = async (req, res) => {
    const { nombre, url, pagina_id, submenu } = req.body;

    try {
        const response = await pool.query('INSERT INTO elementos_menu (nombre, url, pagina_id, submenu) VALUES (?, ?, ?, ?)', [nombre, url, pagina_id, submenu]);
        res.json({
            message: 'Menu Item Added successfully',
            body: {
                page: {nombre},
                url: {url},
                pagina_id: {pagina_id},
                submenu: {submenu}
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Something goes wrong',
            body: {}
        })
    }
}

export const postContentPage = async (req, res) => {
    const { tipo_contenido, contenido, pagina_id } = req.body;

    try {
        const response = await pool.query('INSERT INTO contenido_pagina (tipo_contenido, contenido, pagina_id) VALUES (?, ?, ?)', [tipo_contenido, contenido, pagina_id]);
        res.json({
            message: 'Content Added successfully',
            body: {
                tipo_contenido: {tipo_contenido},
                contenido: {contenido},
                pagina_id: {pagina_id}
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Something goes wrong',
            body: {}
        })
    }
}

// GET ROUTES

export const getAll_Page = async (req, res) => {

    let page_info_array = [];

    try {
        const [rows] = await pool.query(`
        SELECT
        * 
        FROM paginas
        `);

        for (let i = 0; i < rows.length; i++) {
            let page_info = {};
            page_info.id = rows[i].id;
            page_info.nombre = rows[i].nombre;
            page_info.url = rows[i].url;
            page_info.menu_items = [];
            page_info.content = [];

            const [menu_items] = await pool.query(`
            SELECT
            * 
            FROM elementos_menu
            `);

            for (let j = 0; j < menu_items.length; j++) {
                let menu_item = {};
                menu_item.id = menu_items[j].id;
                menu_item.nombre = menu_items[j].nombre;
                menu_item.url = menu_items[j].url;
                menu_item.submenu = menu_items[j].submenu;
                page_info.menu_items.push(menu_item);
            }

            const [content] = await pool.query(`
            SELECT
            * 
            FROM contenido
            WHERE pagina_id = ?
            `, [rows[i].id]);

            for (let k = 0; k < content.length; k++) {
                let content_item = {};
                content_item.id = content[k].id;
                content_item.tipo_contenido = content[k].tipo_contenido;
                content_item.contenido = content[k].contenido;
                page_info.content.push(content_item);
            }

            page_info_array.push(page_info);
        }

        res.json(page_info_array);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Something goes wrong',
            body: {}
        });
    }
};

export const getPage_id = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query(`
        SELECT
        * 
        FROM paginas
        WHERE id = ?
        `, [id]);

        let page_info = {};
        page_info.id = rows[0].id;
        page_info.nombre = rows[0].nombre;
        page_info.url = rows[0].url;
        page_info.menu_items = [];
        page_info.content = [];

        const [menu_items] = await pool.query(`
        SELECT
        * 
        FROM elementos_menu`);

        let menu_item = {};
        for (let j = 0; j < menu_items.length; j++) {
            menu_item.id = menu_items[j].id;
            menu_item.nombre = menu_items[j].nombre;
            menu_item.url = menu_items[j].url;
            menu_item.submenu = menu_items[j].submenu;
            page_info.menu_items.push(menu_item);
        }

        const [content] = await pool.query(`
        SELECT
        * 
        FROM contenido
        WHERE pagina_id = ?
        `, [id]);

        for (let k = 0; k < content.length; k++) {
            let content_item = {};
            content_item.id = content[k].id;
            content_item.tipo_contenido = content[k].tipo_contenido;
            content_item.contenido = content[k].contenido;
            page_info.content.push(content_item);
        }

        res.json(page_info);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Something goes wrong',
            body: {}
        });
    }
}
