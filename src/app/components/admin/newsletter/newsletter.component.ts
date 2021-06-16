import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Newsletter } from 'src/app/models/admin/newsletter.model';
import { AdminsService } from 'src/app/services/admin/admins.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {

  constructor(private adminsService: AdminsService, private cookieService: CookieService) { }

  newExampleTitle = 'Jun 29 2021 and Jul 01 2021 in Virtual'
  newExample = 'Switzerland From 29 June to 1 July 2021, Composites United Switzerland with thesupport of Enterprise Europe Network Switzerland is organising an onlineevent where all players in the field of composites and hybrid materialscan get informed, meet, interact and discuss about sustainability, circulareconomy and recycling.'
  color: string = '#0472EE'
  image: string = '';
  selector: string = '';
  headerTitle: string = 'Título ejemplo:';
  headerText: string = 'Subtítulo ejemplo.';
  footer1: string = 'Saludos,';
  footer2: string = 'Example';
  webText: string = 'www.hermesduck.com';
  webUrl: string = 'www.google.com';
  footerDirection: string = 'ULPGC, Polivalente III, Calle Practicante Ignacio Rodríguez, s/n · 928 11 11 11';
  alias: string = 'Ponga un alias';
  email: string = 'Ponga un email';
  subject: string = 'Ponga un asunto';
  editable: boolean = false;
  customTemplate: Newsletter = { templateColor: this.color, templateImage: '', headerTitle: this.headerTitle, headerText: this.headerText, footer1: this.footer1, footer2: this.footer2, webText: this.webText, webUrl: this.webUrl, footerDirection: this.footerDirection, alias: this.alias, email: this.email, subject: this.subject};
  idAdmin: string = ''
  adminInfo: any = [];
  successful: boolean = false;

  ngOnInit(): void {
    this.idAdmin = this.cookieService.get("currentAdminId");
    this.adminsService.getById(this.idAdmin).then(u => {
      this.adminInfo = u;
      this.customTemplate = this.adminInfo.newsletterCustom;
      document.getElementById('color-table').style.backgroundColor = this.adminInfo.newsletterCustom.templateColor;
      document.getElementById('colot-td').style.backgroundColor = this.adminInfo.newsletterCustom.templateColor;
      document.getElementById('header-image').setAttribute('src', this.adminInfo.newsletterCustom.templateImage);
    })
  }

  changeColor() {
    document.getElementById('color-table').style.backgroundColor = this.color;
    document.getElementById('colot-td').style.backgroundColor = this.color;
    this.customTemplate.templateColor = this.color;
  }

  changeImage() {
    document.getElementById('header-image').setAttribute('src', this.image);
    this.customTemplate.templateImage = this.image;

  }

  editText() {
    window.scrollBy(0, 800)
    this.editable = true;
  }

  saveText() {
    this.editable = false;
  }

  saveTemplate() {
    this.adminInfo.newsletterCustom = this.customTemplate;
    this.adminsService.updateAdmin(this.idAdmin, this.adminInfo).then(u => {
      if (typeof u !== 'undefined') {
        console.log('Datos actualizados');
        this.successful = true;
      }
    })
  }

}
