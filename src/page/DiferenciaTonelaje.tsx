import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IDatasets, IDifrenciaTons, IEquipoMonto, IProductionAct } from '../interface/IProduction';
import productionService from '../services/productionService';
import { TablaBase } from '../components/tablaBase/TableBase';
import { Subtitle2Stronger } from '@fluentui/react-components';

export default function DiferenciaTonelaje() {

    const [diferencias, setDiferencias] = useState<any[]>([]);


    useEffect(() => {
        DataProductionAPI();
        //DataProductionprevAPI();

    }, []);


    const DataProductionAPI = async () => {

        try {
            const response1 = await productionService.GetAllProductionAct();
            const response2 = await productionService.GetAllProductionPrev();

            let listProductionAct: IProductionAct[] = response1.data
            let listProductionPrev: IProductionAct[] = response2.data

            let newLista = listProductionPrev.filter(x => x.relativehour >= 7 && x.relativehour <= 19)


            console.log(`-------- listProductionAct --------`)
            console.log(newLista)


            const diffs: IDifrenciaTons[] = [];

            for (let i = 7; i < 20; i++) { // turno desde las 7 hasta las 19 horas en cada turno
                const actual = listProductionAct.find(item => item.relativehour === i);
                const previo = listProductionPrev.find(item => item.relativehour === i);


                console.log(`-------- fila ${i} --------`)

                console.log(actual)
                console.log("++++")
                console.log(previo)


                if (actual) {


                    console.log(`-------- dentro if --------`)

                    if (previo !== undefined) {

                        diffs.push({
                            relativehour: i,
                            diferenciaTons: actual.tons - previo.tons,
                            tonsActual: actual.tons,
                            tonsPrev: previo.tons
                        });

                    } else {

                        diffs.push({

                            relativehour: i,
                            diferenciaTons: actual.tons,
                            tonsActual: actual.tons,
                            tonsPrev: 0
                        });

                    }
                }
            }



            setDiferencias(diffs);



        } catch (error) {
            console.error('Error al obtener el contenido del archivo', error);
        }

    };

    const columns = [
        { key: "relativehour", label: "Hora", ancho: "10%" },
        { key: "tonsActual", label: "Tn Actual", ancho: "30%" },
        { key: "tonsPrev", label: "Tn Previo", ancho: "15%" },
        { key: "diferenciaTons", label: "Diferencia Tn", ancho: "15%" },

    ];



    return (
        <div style={{ marginLeft: "20px" }}>

            <Subtitle2Stronger>Diferencia de Tonelaje entre Turnos</Subtitle2Stronger>

            <TablaBase

                items={diferencias}
                columns={columns}
            />
        </div>
    )
}
