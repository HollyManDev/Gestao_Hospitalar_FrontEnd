import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './Administracao/MenuPrincipal/inicio/inicio.component';
import { HomeTemplateComponent } from './Administracao/MenuPrincipal/Home/home-template/home-template.component';
import { DeptViewTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Departamento/deptView/dept-view-template/dept-view-template.component';
import { EspeViewTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Especialidade/Esp_View/espe-view-template/espe-view-template.component';
import { LoginTemplateComponent } from './Autenticacao/Login/login-template/login-template.component';
import { FornecedorViewTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Fornecedor/FornecedorView/fornecedor-view-template/fornecedor-view-template.component';
import { LeitoViewTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Leito/Leito/leito-view-template/leito-view-template.component';
import { CamaViewTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Cama/CamaView/cama-view-template/cama-view-template.component';
import { MedicoViewTemplateComponent } from './Administracao/MenuPrincipal/Pessoas/Medico/MedicoView/medico-view-template/medico-view-template.component';
import { MedicamentoViewTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Medicamento/MedicamentoView/medicamento-view-template/medicamento-view-template.component';
import { EquipamentoViewTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Equipamento Medico/EquipamentoView/equipamento-view-template/equipamento-view-template.component';
import { PacienteViewTemplateComponent } from './Administracao/MenuPrincipal/Pessoas/Paciente/PacienteView/paciente-view-template/paciente-view-template.component';
import { CargoViewTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Cargo/CargoView/cargo-view-template/cargo-view-template.component';
import { FuncionarioViewTemplateComponent } from './Administracao/MenuPrincipal/Pessoas/Funcionario/FuncionarioView/funcionario-view-template/funcionario-view-template.component';
import { AngendamentoViewComponent } from './Administracao/Agendamento/Angedamento-View/angendamento-view/angendamento-view.component';
import { ConsultaViewComponent } from './Administracao/Consulta/ConsultaView/consulta-view/consulta-view.component';
import { PaginaInicialComponent } from './Medico/Pagina_Inicial/paginaInicial/pagina-inicial/pagina-inicial.component';
import { AgendaMedicoViewComponent } from './Medico/Agendamento/AgendamentosMedico/agenda-medico-view/agenda-medico-view.component';
import { ConsultaMedicoComponent } from './Medico/Consultas/ConsultaMedicoCrud/consulta-medico/consulta-medico.component';
import { MedicoConsultasViewComponent } from './Medico/Consultas/Medicosconsultasview/medico-consultas-view/medico-consultas-view.component';
import { ExameViewComponent } from './Medico/Exames/ExameView/exame-view/exame-view.component';
import { PrescricaoViewComponent } from './Medico/Prescricao/PrescricaoView/prescricao-view/prescricao-view.component';
import { HistoricomedicoViewComponent } from './Medico/Historico Medico/HistoricoMedicoView/historicomedico-view/historicomedico-view.component';
import { ProdutosViewTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Produtos/ProdutosView/produtos-view-template/produtos-view-template.component';
import { OutroscadastrosViewTemplateComponent } from './Administracao/Outros_Cadastros_admin/Outros_Cadastros_View/outroscadastros-view-template/outroscadastros-view-template.component';


const routes: Routes = [
  { path: 'Login', component:LoginTemplateComponent}, 
 
  {
    path: '', pathMatch: 'full', redirectTo: 'InicialMedico'
  },
  { 
    path: 'InicioAdmin', component: InicioComponent,
    children: [
      { path: 'Home', component: HomeTemplateComponent },
      { path: 'Departamento', component: DeptViewTemplateComponent }, 
      { path: 'Cargo', component: CargoViewTemplateComponent },
      { path: 'Especialidade', component: EspeViewTemplateComponent }, 
      { path: 'Fornecedor', component: FornecedorViewTemplateComponent }, 
      { path: 'Leito', component: LeitoViewTemplateComponent }, 
      { path: 'Cama', component: CamaViewTemplateComponent }, 
      { path: 'Medico', component: MedicoViewTemplateComponent }, 
      { path: 'Medicamento', component: MedicamentoViewTemplateComponent }, 
      { path: 'Equipamento', component: EquipamentoViewTemplateComponent }, 
      { path: 'Paciente', component: PacienteViewTemplateComponent }, 
       { path: 'Funcionario', component: FuncionarioViewTemplateComponent }, 
       { path: 'Outros', component:OutroscadastrosViewTemplateComponent }, 
       { path: 'Agendamento', component: AngendamentoViewComponent }, 
       { path: 'Consulta', component: ConsultaViewComponent}, 
       { path: 'Produtos', component: ProdutosViewTemplateComponent}, 
    ]
  },
  { path: 'InicialMedico', component:PaginaInicialComponent,
    children: [
      { path: 'AgendamentosMedico', component: AgendaMedicoViewComponent },
      { path: 'ConsultasMedico', component: MedicoConsultasViewComponent},
      { path: 'ExamesMedico', component: ExameViewComponent},
      { path: 'PrescricoesMedicas', component: PrescricaoViewComponent},
      { path: 'HistoricoMedico', component: HistoricomedicoViewComponent},
      

    ]
  }, 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
