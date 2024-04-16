export interface Exits {
    data: ExitsData[];
}

export interface ExitsData {
    tipo_inmueble: string;
    precio_compra: number;
    precio_venta: number;
    rentabilidad: number;
    descripcion: string;
    imagen: string;
}