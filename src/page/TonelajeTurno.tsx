import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IDatasets, IDifrenciaTons, IEquipoMonto, IGroupedDataTonelajeTurno, IProductionAct } from '../interface/IProduction';
import productionService from '../services/productionService';
import { Body1Strong, makeStyles, Subtitle2Stronger, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
    container: {
        gap: "16px",
        display: "flex",
        flexDirection: "column",
    },
});

export default function TonelajeTurno() {

    const styles = useStyles();

    const [dataAct, setDataAct] = useState<IGroupedDataTonelajeTurno>({});
    const [dataPrev, setDataPrev] = useState<IGroupedDataTonelajeTurno>({});

    const [selectedMaterial, setSelectedMaterial] = useState<string>('');

    const [totalTonsAct, setTotalTonsAct] = useState(0);
    const [totalTonsPrev, setTotalTonsPrev] = useState(0);

    useEffect(() => {
        DataProductionAPI();


    }, []);


    const DataProductionAPI = async () => {

        try {
            const response1 = await productionService.GetAllProductionAct();
            const response2 = await productionService.GetAllProductionPrev();

            let listProductionAct: IProductionAct[] = response1.data
            let listProductionPrev: IProductionAct[] = response2.data

            let newLista = listProductionPrev.filter(x => x.relativehour >= 7 && x.relativehour <= 19)




            const groupedDataAct = listProductionAct.reduce((nuevoObjeto: any, modelProductionAct: IProductionAct) => {
                const { dim_name_material, tons } = modelProductionAct;

                if (!nuevoObjeto[dim_name_material]) {
                    nuevoObjeto[dim_name_material] = 0;
                }

                nuevoObjeto[dim_name_material] += tons;

                return nuevoObjeto;

            }, {});

            const groupedDataPrev = listProductionPrev.reduce((nuevoObjeto: any, modelProductionPrev: IProductionAct) => {
                const { dim_name_material, tons } = modelProductionPrev;
                if (!nuevoObjeto[dim_name_material]) {
                    nuevoObjeto[dim_name_material] = 0;
                }
                nuevoObjeto[dim_name_material] += tons;
                return nuevoObjeto;
            }, {});

            setDataAct(groupedDataAct);
            setDataPrev(groupedDataPrev);

        } catch (error) {
            console.error('Error al obtener el contenido del archivo', error);
        }

    };

    const handleMaterialChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        let nombreMaterial = event.target.value;

        let totalTonsAct = nombreMaterial ? dataAct[nombreMaterial] || 0 : 0;
        let totalTonsPrev = nombreMaterial ? dataPrev[nombreMaterial] || 0 : 0;

        let diferenciaTons = totalTonsAct - totalTonsPrev

        console.log(`-------- totalTonsAct --------`)
        console.log(totalTonsAct)

        setTotalTonsAct(totalTonsAct)
        setTotalTonsPrev(totalTonsPrev)


        setSelectedMaterial(nombreMaterial);
    };

    /*  const totalTonsAct = selectedMaterial ? dataAct[selectedMaterial] || 0 : 0;
     const totalTonsPrev = selectedMaterial ? dataPrev[selectedMaterial] || 0 : 0;
  */


    return (
        <div style={{ marginLeft: "20px" }}>

            <Subtitle2Stronger>Tonelaje por turno</Subtitle2Stronger>

            <div>
                <label htmlFor="material-select">Selecciona un material:</label>
                <select id="material-select" onChange={handleMaterialChange}>
                    <option value="">--Selecciona un material--</option>
                    {Object.keys({ ...dataAct, ...dataPrev }).map(material => (
                        <option key={material} value={material}>
                            {material}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.container}>
                <br />
                <Body1Strong>Material: {selectedMaterial}o</Body1Strong>
                <Text>Tonelaje Turno Actual: {totalTonsAct}</Text>
                <Text>Tonelaje Turno Anterior: {totalTonsPrev}</Text>


            </div>
        </div>
    )
}
