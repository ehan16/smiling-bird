import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  services = [
    {
      title: 'cirugía bucal',
      description:
        // tslint:disable-next-line: max-line-length
        'Prevención, diagnóstico y tratamiento de toda la patología quirúrgica propia o asociada a dientes, mucosas, labios, encías y huesos maxilares.',
      image: '../../../assets/treatments/cirugia_bucal.jpg'
    },
    {
      title: 'estética dental',
      description:
        // tslint:disable-next-line: max-line-length
        'Análisis y estudio de las características dentogingivales para corregir defectos cosméticos y embellecer el aspecto general de la dentadura',
      image: '../../../assets/treatments/blanqueamiento.jpg'
    },
    {
      title: 'implantes',
      description:
        // tslint:disable-next-line: max-line-length
        'Reposición de los dientes perdidos con dispositivos biocompatibles de titanio que viabilizan la rehabilitación oral fija de los pacientes parcial o totalmente edéntulos.',
      image: '../../../assets/treatments/implante.jpg'
    },
    {
      title: 'endodoncia',
      description:
        // tslint:disable-next-line: max-line-length
        'Limpieza, desinfección y conformación de los conductos radiculares como paso previo a los múltiples procedimmientos de próteses y restauración dental.',
      image: '../../../assets/treatments/tratamiento_conducto.jpg'
    },
    {
      title: 'ortodoncia',
      description:
        // tslint:disable-next-line: max-line-length
        'Brackets y aparatoría funcional para la correción biomecánica de maloclusiones, malposiciones dentales y deformidades dentofaciales.',
      image: '../../../assets/treatments/ortodoncia.jpg'
    },
    {
      title: 'prótesis oral',
      description:
        // tslint:disable-next-line: max-line-length
        'Diseño y confección de coronas cerámicas y estructuras protésicas que restituyen la integridad de las arcadas dentales, estética y función masticatoria.',
      image: '../../../assets/treatments/protesis_dental.jpg'
    }
  ];

  testimonials = [
    {
      // tslint:disable-next-line: max-line-length
      opinion: '“Quería colocarme implantes dentales y no sabía dónde. Solicité varias opiniones y finalmente me decidí por SMILING BIRD porque me ofrecieron las mejores garantías y me transmitieron mucha seguridad. Ahora que acabé el tratamiento puedo decir que quedé encantada y que todo el equipo me pareció muy profesional”.',
      name: 'Sara López',
      career: 'Abogada'
    },
    {
      // tslint:disable-next-line: max-line-length
      opinion: '“Antes me daba vergüenza sonreír porque no estaba conforme con el aspecto de mi dentadura. Desde que visité SMILING BIRD me siento más cómoda y segura de mi misma. Me hicieron un diseño digital de sonrisa, me cortaron las encías y me blanquearon los dientes”.',
      name: 'Jessica Wong',
      career: 'Estudiante'
    },
    {
      // tslint:disable-next-line: max-line-length
      opinion: '“Me vi en la necesidad de ir a la clínica para tratar algunas caries y hacerme dos tratamientos de conducto. Recomendaría a SMILING BIRD por la asesoría, por la receptividad de su personal, por sus impecables instalaciones, y sobre todo porque los procedimientos fueron ejecutados sin ningún tipo de dolor”.',
      name: 'Pablo Marcano',
      career: 'Contador Público'
    }
  ];

  constructor(private userService: UserService) {}
  ngOnInit() {}

}

