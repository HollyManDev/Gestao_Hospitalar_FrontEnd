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
import { MatDialogModule } from '@angular/material/dialog'; // Adicione isso
import { MatTableModule } from '@angular/material/table'; // Certifique-se de incluir MatTable
import { MatPaginatorModule } from '@angular/material/paginator'; // Certifique-se de incluir MatPaginator
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
import { MatDatepickerModule } from '@angular/material/datepicker'; // Adicione isso
import { MatNativeDateModule } from '@angular/material/core';
import { EquipamentoViewTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Equipamento Medico/EquipamentoView/equipamento-view-template/equipamento-view-template.component';
import { EquipamentoCrudTemplateComponent } from './Administracao/MenuPrincipal/Cadastro/Equipamento Medico/EquipamentoCrud/equipamento-crud-template/equipamento-crud-template.component';
import { PacienteViewTemplateComponent } from './Administracao/MenuPrincipal/Pessoas/Paciente/PacienteView/paciente-view-template/paciente-view-template.component';
import { PacienteCrudTemplateComponent } from './Administracao/MenuPrincipal/Pessoas/Paciente/PacienteCrud/paciente-crud-template/paciente-crud-template.component'; // Adicione isso

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
    MatDialogModule, // Certifique-se de que isso está aqui
    MatTableModule, // Também deve estar aqui
    MatPaginatorModule, // E isso aqui
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule, // Adicione aqui
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
