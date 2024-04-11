// Interface for the rentproperty
export interface Rentproperty {
    property: Property[];
}

export interface Property {
    id: number;
    tipo_inmueble: string;
    precio: number;
    direccion: string;
    descripcion: string;
    informacion_detallada: string;
    zona: string;
    disponibilidad: boolean;
    imagen: string;
    capital_aportado: number;
    porcentaje_invertido: number;
}