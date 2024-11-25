export type Coordinates = {
    qualifier: string;
    segments: Segment[]
  }

  type Segment = {
    _id: string;
    coordinates: Annotation;
    genome_length_bp: number;
    isolate_designation: string;
    segment: string;
  }

  type Annotation = {
    id: string 
    nt_acc: string 
    virus_name: string 
    gene_name: string 
    pept_cat: string
    segment: string
    start: number 
    end: number 
    strand: string 
    family: string 
    join: string 
  }