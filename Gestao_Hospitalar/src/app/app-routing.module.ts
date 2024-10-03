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


const routes: Routes = [
  { path: 'Login', component:LoginTemplateComponent}, 
  {
    path: '', pathMatch: 'full', redirectTo: 'InicioAdmin'
  },
  { 
    path: 'InicioAdmin', component: InicioComponent,
    children: [
      { path: 'Home', component: HomeTemplateComponent },
      { path: 'Departamento', component: DeptViewTemplateComponent }, 
      { path: 'Especialidade', component: EspeViewTemplateComponent }, 
      { path: 'Fornecedor', component: FornecedorViewTemplateComponent }, 
      { path: 'Leito', component: LeitoViewTemplateComponent }, 
      { path: 'Cama', component: CamaViewTemplateComponent }, 
      { path: 'Medico', component: MedicoViewTemplateComponent }, 
      { path: 'Medicamento', component: MedicamentoViewTemplateComponent }, 
      { path: 'Equipamento', component: EquipamentoViewTemplateComponent }, 
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
