import { fetchProductionUrl } from "./http-common";

let urlProduction = "Production";


function GetAllProductionAct() {

    return fetchProductionUrl.get(`${urlProduction}/leerArchivo/productionact`)
}

function GetAllProductionPrev() {

    return fetchProductionUrl.get(`${urlProduction}/leerArchivo/productionprev`)
}

const productionService = {

    GetAllProductionAct,
    GetAllProductionPrev

}

export default productionService;

