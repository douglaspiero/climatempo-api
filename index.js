const puppeteer = require('puppeteer');
const express = require('express')
const app = express()
const port = 5000
var dados

// Função Puppeteer
const tempo = async (cidade) => {
    console.log("##INICIO DO ROBO##");
    console.log("Pesquisando Dados...");
    const cidadeV = await cidade;
    const cidadeConvertida = await cidadeV.split(" ").join("+");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = await `https://www.google.com/search?q=tempo+${cidadeConvertida}&sxsrf=AOaemvKYvOjDbDGw8iiCZ6ITzj2zYABDHQ%3A1637008390441&ei=BsSSYfagGujO1sQPxN6FGA&oq=tempo+${cidadeConvertida}&gs_lcp=Cgdnd3Mtd2l6EAMyDAgjECcQnQIQRhCAAjIFCAAQgAQyBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMggIABAWEAoQHjICCCYyAggmOgcIABBHELADOgcIABCwAxBDSgQIQRgAUPcFWK4OYPMPaAFwAngAgAHyAogB8wOSAQcwLjEuMC4xmAEAoAEByAEKwAEB&sclient=gws-wiz&ved=0ahUKEwj2u-y8m5v0AhVop5UCHURvAQMQ4dUDCA4&uact=5`;
    await page.goto(url);
    dados = await page.evaluate(() => {
        return {
            temperatura: document.querySelector('.wob_t.q8U8x').textContent,
            chuva: document.getElementById('wob_pp').textContent,
            umidade: document.getElementById('wob_hm').textContent,
            vento: document.getElementById('wob_ws').textContent,
            cidade: document.getElementById('wob_loc').textContent,
            dataHora: document.getElementById('wob_dts').textContent,
            status: document.getElementById('wob_dc').textContent   
        };
    });
    console.log("Dados obtidos com Sucesso !")
    await browser.close();
    console.log(dados);
    console.log("##FIM DO ROBO"); 
    return dados;     
};


app.get('/API/:cidade', async(req, res) => { 
    const cidade = req.params.cidade;
    const cidadeConvertida = await cidade.split(" ").join("+");
    await tempo(cidade);
    await res.json(dados);

})
  
app.listen(port || process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
