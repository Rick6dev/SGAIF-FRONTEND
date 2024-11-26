export interface TipoAuditoria {
  id_tipo_auditoria: number;
  nombre_tipo_auditoria: string;
  cod_tipo_auditoria: string;
}

export interface Informe {
  code: string;
  nombre_informe: string;

  select_one_tipoGrc: string;
  timestre: string | null;
  fk_tipoAud: number;
  currentYear: number;
  currentMounth: number;
}

export interface User {
  userId: number;
  userNombre: string;
  areaTrabajo: string;
  rol: string;
  role: number;
  token: string;
}

export interface Comentario {
  comentario: string;
  fecha_comentario: Date;
  id_auditor_responsable: number;
  id_comentario: number;
  id_hallazgo: number;
}

export interface Hallazgo {
  detalle: string;
  fecha_compromiso: number;
  id_riesgo: number;
  id_nivel: number;
  estatus: number;
  recomendacion: string;
  accion: string;
  id_informe: string | null;
  id_gerencia: null | number;
  id_auditor: number;
  id_gerencia_encargada: number;
}

export interface HallazgoOne {
  accion_correctiva: string | null;
  cerrado: boolean;
  estatus_Plan_Accion: string;
  fecha_cierre: string | null;
  fecha_compromiso: string;
  fecha_creacion: string;
  hallazgo_reportado: string;
  id_auditor_responsable: number;
  id_gerencia: number;
  id_hallazgo: number;
  id_informe_auditoria: number;
  id_nivel_riesgo: number;
  id_riesgo_asociado: number;
  informe_auditorium: {
    nombre_informe: string;
    cod_informe: string;
  };
  recomendacion: string;
}

export interface FlagFilter {
  estatus: boolean;
  previoEstado: string;
  filter: boolean;
  filterGrc: boolean;
  actualEstado: string;
  flagGrc: boolean;
}

export interface HallazgoUnico {
  accion_correctiva: string | null;
  cerrado: boolean;
  estatus_Plan_Accion: string;
  fecha_cierre: Date | null;
  fecha_compromiso: Date;
  fecha_creacion: Date | null;
  hallazgo_reportado: string;
  id_auditor_responsable: number;
  id_gerencia: number | null;
  id_hallazgo: number;
  id_informe_auditoria: number;
  id_nivel_riesgo: number;
  id_riesgo_asociado: number;
  recomendacion: string;
  areaTrabajo: string;
}

export interface UpdateInforme {
  cod_informe: string;
  created_mounth: string;
  created_year: number;
  id_gerencia_encargada: number;
  id_informe_auditoria: number;
  id_tipo_auditoria: number;
  nombre_informe: string;
  trimestre: string;
}

export interface Gerencia {
  id_gerencia: number;
  nombre_gerencia: string;
  id_vp: number;
  status: number;
}

export interface NvlRsg {
  id_nivel_riesgo: number;
  nombre_nivel_riesgo: string;
}


export  interface macroproceso{
  id_macroproceso: number,
  nombre_macroproceso: string
}