export interface MenuItem {
    text:string;
    route?:string;
    event?: () => void; // Función opcional para manejar eventos

}