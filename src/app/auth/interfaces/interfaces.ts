export interface AuthResponse {
  token: string;
  message: String;
  StatusCode: number,
  Mensaje:string,
  usuario: User
}

export interface LoginRequest {
  password: string;
  companyId: string;
  username: string;
  desdeMs: boolean;
}


export interface User {
  apellido: string | null;
  nombre: string | null;
  sexo: any;
  fecha: string | null;
  f_NACE: any;
  doctO_IDENT: string | null;
  clasE_DOCTO: any;
  expedidO_EN: any;
  ciudad: any;
  barrio: any;
  esT_CIVIL: any;
  nrO_HIJOS: any;
  direccion: any;
  telefono: any;
  libreta: any;
  distrito: any;
  clase: any;
  cargo: any;
  salario: any;
  empleado: any;
  dpto: any;
  ccosto: any;
  seccion: any;
  area: any;
  nivel: any;
  sucursal: any;
  ubicacion: any;
  grupo: any;
  subgrupo: any;
  nacionalidad: any;
  division: any;
  subdivision: any;
  proyecto: any;
  grupO_RH: any;
  niveL_EDU: any;
  usuario: string | null;
  clave: string | null;
  e_MAIL: string | null;
  p_CARGO: any;
  celular: any;
  cdgcia: any;
  telE_OFC: any;
  extension: any;
  diR_OFC: any;
  puedE_VIAJAR: any;
  puedE_TRASLADAR: any;
  anoS_EXPERIENCIA: any;
  tipO_COTIZANTE: any;
  ciudaD_TRABAJA: any;
  idprofesion: any;
  ciudaD_N: any;
  ciudaD_NACI: any;
  perfiL_PRO: any;
  apto: any;
  completo: any;
  contratado: any;
  vetado: any;
  observacion: any;
  telefono2: any;
  CabFlia: any;
  ContactoEmerg: any;
  EmailContEmerg: any;
  EtelContEmerg: any;
  MnjIdioma: any;
  idioma: any;
  TrabajaAntEmpr: any;
  localidad: any;
  EstSocioeconominco: any;
  PerTrabEmp: any;
  NOMBRE_PER_TRAB_EMP: any;
  ApellidoPerTrabEmp: any;
  DoctoPerTrabEmp: any;
  NombreReferencia: any;
  ApellidoReferencia: any;
  DoctoReferencia: any;
  AntBarrio: any;
  PerReferencia: any;
  TrabajaAct: any;
  UltEmpr: any;
}

export interface RegisterResponse {
  token: string;
  usuario: User;
}


export interface UserDTO {
  CiaUsr:string,
  Compania:string,
  Email:string,
  FechaExpira: any
  Grupo:any
  IdTercero:any
  Identificacion:string
  IndNivelSGU:any
  MWebP:any,
  Nombre:string,
  Password:string,
  Rol:any
  Usuario:string
}

//registro
export interface RegisterRequest {
nombre:string,
apellido:string ,
doctoIdent:string,
email:string,
clave:string,
cia:string
}
