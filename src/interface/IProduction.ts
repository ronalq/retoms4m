

export interface IProductionAct {
    idcs: string;
    hour: number;
    relativehour: number;
    shift: number;
    tons: number;
    hangsum: number;
    hangavg: number;
    queuesum: number;
    queueavg: number;
    au: number;
    loadingequipmentname: string;
    haulingcategoryname: string;
    loadingcategoryname: string;
    loadingequipmentid: number;
    loadingfleettypeid: number;
    loadingfleetcategoryid: number;
    haulingequipmentid: number;
    haulingfleettypeid: number;
    haulingfleetcategoryid: number;
    ore: number;
    waste: number | null;
    expit_ore: number | null;
    timecycleloading: number;
    timecyclehauling: number;
    mineid: number;
    locationdump: string;
    isreport: boolean | null;
    dim_name_material: string;
    dim_code_description: string;
    fact_datetime_start_time_traveling_empty: string
}

export interface IEquipoZona {
    nombreZona: string;
    listaEquipos?: IEquipoMonto[];
}

export interface IEquipoMonto {
    equipo: string;
    monto?: number[];
}


export interface IDatasets {
    label: string,
    data: number[],
    backgroundColor: string,
    borderColor: string,
    borderWidth: number,
}

export interface IModelData {
    labels: string[],
    dataSets: IDatasets[],

}

export interface ITablaData {
    material: string,
    hour: number,
    tons: number,
}

export interface IGroupedData {
    [dim_name_material: string]: {
        [hour: number]: number;
    };
}

export interface IDifrenciaTons {
    relativehour: number;
    tonsActual: number;
    tonsPrev: number;
    diferenciaTons: number;

}

export interface IGroupedDataTonelajeTurno {
    [dim_name_material: string]: number;
  }