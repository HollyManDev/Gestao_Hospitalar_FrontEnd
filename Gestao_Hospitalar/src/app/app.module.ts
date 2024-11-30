import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './Administracao/MenuPrincipal/inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table'; 
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatSelectModule } from '@angular/material/select';
import { HomeTemplateComponent } from './Administracao/MenuPrincipal/Home/home-template/home-template.component';
import { DeptViewTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Departamento/deptView/dept-view-template/dept-view-template.component';
import { DeptCrudTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Departamento/deptCrud/dept-crud-template/dept-crud-template.component';
import { EspeCrudTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Especialidade/EspCrud/espe-crud-template/espe-crud-template.component';
import { EspeViewTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Especialidade/Esp_View/espe-view-template/espe-view-template.component';
import { LoginTemplateComponent } from './Autenticacao/Login/login-template/login-template.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FornecedorViewTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Fornecedor/FornecedorView/fornecedor-view-template/fornecedor-view-template.component';
import { FornecedorCrudTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Fornecedor/FornecedorCrud/fornecedor-crud-template/fornecedor-crud-template.component';
import { LeitoViewTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Leito/Leito/leito-view-template/leito-view-template.component';
import { LeitoCrutTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Leito/LeitoCrud/leito-crut-template/leito-crut-template.component';
import { CamaViewTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Cama/CamaView/cama-view-template/cama-view-template.component';
import { CamaCrudTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Cama/CamaCrud/cama-crud-template/cama-crud-template.component';
import { MedicoViewTemplateComponent } from './Administracao/MenuPrincipal/Pessoas/Medico/MedicoView/medico-view-template/medico-view-template.component';
import { MedicoCrudTemplateComponent } from './Administracao/MenuPrincipal/Pessoas/Medico/MedicoCrud/medico-crud-template/medico-crud-template.component';
import { MedicamentoViewTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Medicamento/MedicamentoView/medicamento-view-template/medicamento-view-template.component';
import { MedicamentoCrudTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Medicamento/MedicoCrud/medicamento-crud-template/medicamento-crud-template.component';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import { EquipamentoViewTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Equipamento Medico/EquipamentoView/equipamento-view-template/equipamento-view-template.component';
import { EquipamentoCrudTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Equipamento Medico/EquipamentoCrud/equipamento-crud-template/equipamento-crud-template.component';
import { PacienteViewTemplateComponent } from './Administracao/MenuPrincipal/Pessoas/Paciente/PacienteView/paciente-view-template/paciente-view-template.component';
import { PacienteCrudTemplateComponent } from './Administracao/MenuPrincipal/Pessoas/Paciente/PacienteCrud/paciente-crud-template/paciente-crud-template.component';
import { FuncionarioViewTemplateComponent } from './Administracao/MenuPrincipal/Pessoas/Funcionario/FuncionarioView/funcionario-view-template/funcionario-view-template.component';
import { FuncCrudTemplateComponent } from './Administracao/MenuPrincipal/Pessoas/Funcionario/FuncionarioCrud/funcionario-crud-template/funcionario-crud-template.component';
import { CargoViewTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Cargo/CargoView/cargo-view-template/cargo-view-template.component';
import { CargoCrudTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Cargo/CargoCrud/cargo-crud-template/cargo-crud-template.component'; // Adicione isso
import { MatTabsModule } from '@angular/material/tabs';
import { OutrosComponent } from './Administracao/MenuPrincipal/Cadastro/OutrosCadastros/outros/outros.component';
import { OutrosViewTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/OutrosCadastros/OutrosView/outros-view-template/outros-view-template.component';
import { AngendamentoViewComponent } from './Administracao/Agendamento/Angedamento-View/angendamento-view/angendamento-view.component';
import { AgendamentoCrudComponent } from './Administracao/Agendamento/Agendamento-Crud/agendamento-crud/agendamento-crud.component';
import { ConsultaViewComponent } from './Administracao/Consulta/ConsultaView/consulta-view/consulta-view.component';
import { ConsultaCrudComponent } from './Administracao/Consulta/ConsultaCrud/consulta-crud/consulta-crud.component';
import { PaginaInicialComponent } from './Medico/Pagina_Inicial/paginaInicial/pagina-inicial/pagina-inicial.component';
import { AgendaMedicoViewComponent } from './Medico/Agendamento/AgendamentosMedico/agenda-medico-view/agenda-medico-view.component';
import { AgendaMedicoCrudComponent } from './Medico/Agendamento/AgendamentosMedico/agenda-medico-crud/agenda-medico-crud.component';
import { ConsultaMedicoComponent } from './Medico/Consultas/ConsultaMedicoCrud/consulta-medico/consulta-medico.component';
import { MedicoConsultasViewComponent } from './Medico/Consultas/Medicosconsultasview/medico-consultas-view/medico-consultas-view.component';
import { ExameViewComponent } from './Medico/Exames/ExameView/exame-view/exame-view.component';
import { ExameCrudComponent } from './Medico/Exames/ExameCrud/exame-crud/exame-crud.component';
import { PrescricaoViewComponent } from './Medico/Prescricao/PrescricaoView/prescricao-view/prescricao-view.component';
import { PrescricaoCrudComponent } from './Medico/Prescricao/PrescricaoCrud/prescricao-crud/prescricao-crud.component';
import { HistoricoMedicoCrudComponent } from './Medico/Historico Medico/HistoricoMedico-Crud/historico-medico-crud/historico-medico-crud.component';
import { HistoricomedicoViewComponent } from './Medico/Historico Medico/HistoricoMedicoView/historicomedico-view/historicomedico-view.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    HomeTemplateComponent,
    DeptViewTemplateComponent,
    DeptCrudTemplateComponent,
    EspeCrudTemplateComponent,
    EspeViewTemplateComponent,
    LoginTemplateComponent,
    FornecedorViewTemplateComponent,
    FornecedorCrudTemplateComponent,
    LeitoViewTemplateComponent,
    LeitoCrutTemplateComponent,
    CamaViewTemplateComponent,
    CamaCrudTemplateComponent,
    MedicoViewTemplateComponent,
    MedicoCrudTemplateComponent,
    MedicamentoViewTemplateComponent,
    MedicamentoCrudTemplateComponent,
    EquipamentoViewTemplateComponent,
    EquipamentoCrudTemplateComponent,
    PacienteViewTemplateComponent,
    PacienteCrudTemplateComponent,
    FuncionarioViewTemplateComponent,
    FuncCrudTemplateComponent,
    CargoViewTemplateComponent,
    CargoCrudTemplateComponent,
    OutrosComponent,
    OutrosViewTemplateComponent,
    AngendamentoViewComponent,
    AgendamentoCrudComponent,
    ConsultaViewComponent,
    ConsultaCrudComponent,
    PaginaInicialComponent,
    AgendaMedicoViewComponent,
    AgendaMedicoCrudComponent,
    ConsultaMedicoComponent,
    MedicoConsultasViewComponent,
    ExameViewComponent,
    ExameCrudComponent,
    PrescricaoViewComponent,
    PrescricaoCrudComponent,
    HistoricoMedicoCrudComponent,
    HistoricomedicoViewComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatMenuModule,
    MatFormFieldModule,
    MatExpansionModule,
    HttpClientModule,
    MatDialogModule, 
    MatTableModule, 
    MatPaginatorModule, 
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
