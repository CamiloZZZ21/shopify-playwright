const { chromium } = require("playwright");

async function sendOrder(order) {

    const context = await chromium.launchPersistentContext(
        "./profile",
        {
            channel: "chrome",
            headless: false,
            viewport: null
        }
    );

    const page = context.pages()[0] || await context.newPage();

    // Abrir Shopify
    await page.goto(
        "https://admin.shopify.com/store/whgrkg-rk/orders",
        {
            waitUntil: "networkidle"
        }
    );

    console.log("Buscando pedido:", order);

    // Buscar el pedido
    const buscador = page.getByRole("textbox", {
        name: "Buscar y filtrar"
    });

    await buscador.click();
    await buscador.fill(String(order));
    await page.keyboard.press("Enter");

    // Esperar resultados
    await page.waitForLoadState("networkidle");

    console.log("Abriendo pedido...");

    // Abrir el pedido
    await page.getByRole("link", {
        name: "#" + order
    }).click();

    await page.waitForLoadState("networkidle");

    console.log("Pedido abierto.");

    // Esperar que aparezca el botón
    await page.getByRole("button", {
        name: "Más acciones"
    }).waitFor();

    console.log("Abriendo menú...");

    await page.getByRole("button", {
        name: "Más acciones"
    }).click();

    // Esperar menú
    await page.waitForTimeout(500);

    console.log("Enviando a Dropi...");

    await page.getByRole("menuitem", {
        name: "Enviar a Dropi"
    }).click();

    console.log("Pedido enviado.");

    return {
        success: true
    };
}

module.exports = {
    sendOrder
};