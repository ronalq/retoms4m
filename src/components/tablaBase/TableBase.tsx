import {
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableCellLayout,
    TableHeader,
    TableHeaderCell,
    TableRow,
    Caption1,
  } from "@fluentui/react-components";
  import { useEffect, useState } from "react";
  
  import { ChevronRight20Filled, ChevronLeft20Filled } from "@fluentui/react-icons";
  
  //------------INTERFACES ---------------//
  interface ITablaBase {
    buttonLeft?: any;
    buttonRight?: any;
    loadingSpinner?: any;
    columns?: any;
    items: any;
  }
  
  let _buttonLeft: any;
  let _buttonRight: any;
  let _loadingSpinner: any;
  let _columns: any;
  let _items: any;
  let _filterTabla: any; //antes: IFilter
  let _setFilterTabla: React.Dispatch<React.SetStateAction<any>>;
  let _totalData: number;
   
  //--------------------------------------//
  export const TablaBase = ({
    buttonLeft = _buttonLeft,
    items = _items,
    buttonRight = _buttonRight,
    columns = _columns,
    loadingSpinner = _loadingSpinner,
    filterTabla = _filterTabla,
    setFilterTabla = _setFilterTabla,
    totalData = _totalData,
    newItems = 0,
  }) => {
    //const [loadingSpinner, setLoadingSpinner] = useState(true);
    //const [cantRenderizado, setCantRenderizado] = useState(0);
    const [mensaje, setMensaje] = useState("");
    //const [filter, setFilter] = useState<IFilter>(_initialFilter());
    const [itemsView, setitemsView] = useState(50);
    const [total, setTotal] = useState(0);
    const [contador, setContador] = useState(1);
  
    useEffect(() => {
      setTotal(items);
    }, [items]);
  
    function validacion(data: []) {
      if (data.length > 0) {
        //setLoadingSpinner(false);
      }
    }
  
    return (
      <div>
        <div style={{ margin: "5px 0px" }}>
          {/* <CommandBar buttonLeft={buttonLeft} buttonRight={buttonRight} /> */}
        </div>
        <div
          style={{
            color: "#292827",
            //fontFamily: "Segoe UI",
            fontSize: "13px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "20px",
            margin: "13px",
          }}
        ></div>
  
        {loadingSpinner ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "1fr",
              alignItems: "center",
            }}
          >
            <br />
            <Spinner size="extra-small" label="Obteniendo Datos" />
          </div>
        ) : mensaje === "" ? (
          <div>
            <div
              style={{
                display: "flex",
                minWidth: "1fr",
                maxWidth: "1fr",
                overflowX: "scroll",
                margin: "0px 5px",
                paddingBottom: "20px",
                overflowY: "scroll",
                maxHeight: "69vh",
              }}
            >
              <Table role="grid" size="small" aria-label="Table with small size">
                <TableHeader style={{ height: "30px" }}>
                  <TableRow>
                    {columns.map((column: any, i: any) => (
                      <TableHeaderCell
                        key={column.key}
                        style={{
                          fontFamily: "inherit",
                          fontWeight: "600",
                          position: "sticky",
                          top: 0,
                          width: column.ancho,
                          zIndex: 1,
                          backgroundColor: "#fff",
                          color: "#424242"
                        }}
                      >
                        {column.label}
                      </TableHeaderCell>
                    ))}
                    <TableHeaderCell />
                  </TableRow>
                </TableHeader>
  
                <TableBody style={{ overflowY: "scroll" }}>
                  {items.length > 0 ? (
                    items.map((item: any, i: any) => (
                      <TableRow
                        key={i}
                        style={{
                          maxHeight: "45px",
                          overflow: "hidden",
                        }}
                      >
                        {columns.map((column: any, i: any) => (
                          <TableCell
                            key={column.key}
                            style={{
                              maxHeight: "30px",
                              marginBottom: "50px",
                              fontSize: "12px",
                              color: "#5c5c5c"
                            }}
                          >
                            <div
                              style={{
                                overflow: "hidden",
                              }}
                            >
                              {item[column.key]}
                              {column.key === "render" ? (
                                <TableCellLayout>
                                  {column.onRender && column.onRender(item, i)}
                                </TableCellLayout>
                              ) : column.key === "renderC" ? (
                                <TableCellLayout>
                                  {column.onRender && column.onRender(item, i)}
                                </TableCellLayout>
                              ) : column.key === "renderO" ? (
                                <TableCellLayout>
                                  {column.onRender && column.onRender(item, i)}
                                </TableCellLayout>
                              ) : (
                                <> </>
                              )}
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length}> No hay datos </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
  
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "1fr",
              height: "60vh",
              alignItems: "center",
            }}
          >
            {mensaje}
          </div>
        )}
      </div>
    );
  };
  