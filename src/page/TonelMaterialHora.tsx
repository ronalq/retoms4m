import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IDatasets, IEquipoMonto, IGroupedData, IProductionAct, ITablaData } from '../interface/IProduction';
import productionService from '../services/productionService';
import { Avatar, Subtitle2Stronger, Table, TableBody, TableCell, TableCellLayout, TableHeader, TableHeaderCell, TableRow } from '@fluentui/react-components';
import { TablaBase } from '../components/tablaBase/TableBase';

export default function TonelMaterialHora() {

    const [fileContent, setFileContent] = useState<IProductionAct[]>([]);

    useEffect(() => {

        DataProductionactAPI();

    }, []);


    const DataProductionactAPI = async () => {

        try {
            const response = await productionService.GetAllProductionAct();

            setFileContent(response.data);
            let listProd: IProductionAct[] = response.data

            let tipoMaterial: string[] = listProd.map(x => x.dim_name_material)

            let setTipoMaterial = new Set<string>(tipoMaterial);
            let listTipoMaterial: string[] = [...setTipoMaterial];


            console.log(`--------setTipoMaterial--------`)
            console.log(listTipoMaterial)

        } catch (error) {
            console.error('Error al obtener el contenido del archivo', error);
        }

    };

    const groupedData = fileContent.reduce((acc: any, modelProductionAct: IProductionAct) => {


        const { dim_name_material, hour, tons } = modelProductionAct;


        if (!acc[dim_name_material]) {
            acc[dim_name_material] = {};
        }
        if (!acc[dim_name_material][hour]) {

            acc[dim_name_material][hour] = 0;
        }

        acc[dim_name_material][hour] += tons;

        return acc;

    }, {});


    const tableData: ITablaData[] = [];

    Object.keys(groupedData).forEach(material => {

        Object.keys(groupedData[material]).forEach(hour => {
            tableData.push({
                material,
                hour: parseInt(hour, 10),
                tons: groupedData[material][hour]
            });
        });

    });

    tableData.sort((a, b) => b.hour - a.hour);


    const columns = [
        { key: "hour", label: "Hora", ancho: "10%" },
        { key: "material", label: "Material", ancho: "30%" },
        { key: "tons", label: "Toneladas", ancho: "15%" },
     
      ];
    

    return (
        <div style={{ marginLeft: "20px" }}>
            <Subtitle2Stronger>Tonelaje por material para cada hora del turno</Subtitle2Stronger>

            <TablaBase
        
                items={tableData}
                columns={columns}
            />


        </div>
    )
}
