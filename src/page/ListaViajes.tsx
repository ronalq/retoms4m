// src/components/GraficoBarras.tsx

import React, { useEffect, useState } from 'react';
import { ChartData } from 'chart.js';
import * as fs from 'fs';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import axios from 'axios';
import { IDatasets, IEquipoMonto, IEquipoZona, IModelData, IProductionAct } from '../interface/IProduction';
import productionService from '../services/productionService';
import { Button, Subtitle2Stronger } from '@fluentui/react-components';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ListaViajes = () => {

    const [fileContent, setFileContent] = useState<IProductionAct[]>([]);
    const [listaZonas, setListaZonas] = useState<string[]>([]);
    const [listaEquipos, setListaEquipos] = useState<string[]>([]);
    const [dataSetsInfo, setDataSetsInfo] = useState<any[]>([]);

    useEffect(() => {

        DataProductionactAPI();

    }, []);


    const DataProductionactAPI = async () => {

        try {
            const response = await productionService.GetAllProductionAct();

            setFileContent(response.data);

            let listProd: IProductionAct[] = response.data

            let listZonas: string[] = listProd.map(x => x.locationdump) //zonas de descarga
            let listEquipos: string[] = listProd.map(x => x.loadingequipmentname) //Nombre del equipo de carga

            let set = new Set<string>(listZonas);
            let zonasUnicas: string[] = [...set];


            console.log(`-------- ZONA UNICA --------`)
            console.log(zonasUnicas)

            setListaZonas(zonasUnicas)

            let setEquipos = new Set<string>(listEquipos);
            let equiposUnicos: string[] = [...setEquipos];

            console.log(`-------- equipo UNICA --------`)
            console.log(equiposUnicos)

            setListaEquipos(equiposUnicos)

            let dataSetModel: IDatasets[] = []

            equiposUnicos.forEach((equipo, i) => {

                let newEquipo: IEquipoMonto = {
                    equipo: equipo
                }

                let listaMonto: number[] = []

                zonasUnicas.forEach(zona => {

                    let monto = 0;

                    const totalPrice = listProd
                        .filter(product => product.locationdump === zona && product.loadingequipmentname === equipo) // Filtra los productos que cumplen la condición
                        .reduce((total, product) => total + product.tons, 0);

                    listaMonto.push(totalPrice)

                });

                newEquipo.monto = listaMonto;

                console.log(`-------- equipo  --------`)
                console.log(newEquipo)

                let newEquipoDataset: IDatasets = {
                    label: equipo,
                    data: listaMonto,
                    backgroundColor: `${generateRandomRGBAColors(4)}`,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                }

                dataSetModel.push(newEquipoDataset)
            });


            setDataSetsInfo(dataSetModel)

        } catch (error) {
            console.error('Error al obtener el contenido del archivo', error);
        }

    };

    const getRandomRGBAColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const a = (Math.random() * 0.5 + 0.5).toFixed(1);
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    };

    const generateRandomRGBAColors = (numColors: number) => {
        return Array.from({ length: numColors }, () => getRandomRGBAColor());
    };

    const data = {

        labels: listaZonas,
        datasets: dataSetsInfo
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Tonelaje por Zona y Equipo de Carga',
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    return (

        <div  style={{ marginLeft: "20px" }} >
        
            <Subtitle2Stronger>Tonelaje de cada equipo de carga a zona de descarga</Subtitle2Stronger>
           
            <Bar data={data} options={options} />
            <br />
            <br /><br />

        </div>
    );
};

export { ListaViajes };
