import { Component, OnInit, ViewChild } from '@angular/core';
import { New } from '../../../models/admin/new.model';
import { NewsService } from '../../../services/admin/news.service';
import { TagsService } from '../../../services/admin/tags.service';
import { CKEditorComponent } from 'ng2-ckeditor';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  @ViewChild(CKEditorComponent) ckEditor: CKEditorComponent;


  newTags: any = [];
  tags: any = [];
  news: any = [];
  newNew: New = { title: '', body: '', link: '', tag: this.newTags }

  constructor(private newsService: NewsService, private tagsService: TagsService) { }

  ngOnInit(): void {
    this.newsService.getAllNews().then(u => { this.news = u });
    this.tagsService.getAllTags().then(u => { this.tags = u });

  }

  editState(notice: any) {

    this.tags.map((u: any) => {
      u.editable = false;
      notice.editable = true;
    })

    this.tags.map(u => {
      let exist = notice.tag.find(b => b.name == u.name);

      notice.tag.find(b => {
        if (b.name == u.name) {
          b.checked = true;
        }
      });

      if (!exist) {
        notice.tag.push(u);
      }
    })
  }

  addNew() {
    this.newNew.tag = this.tags.filter(u => u.checked == true);
    this.newsService.postNew(this.newNew).then(u => {
      if (typeof u !== "undefined") {
        this.news.push(u);
        this.newNew = { title: '', body: '', link: '', tag: '' }
      }
    })
  }

  deleteNew(id: string) {
    this.newsService.deleteNew(id).then(u => {
      if (u === 'OK') {
        const newsFiltered = this.news.filter((news: any) => news._id != id);
        this.news = newsFiltered;
      }
    })
  }

  updateNews(notice: any) {
    notice.editable = false;
    notice.tag = notice.tag.filter(u => u.checked && u.checked == true);

    this.newsService.updateNew(notice._id, notice);
  }

  ngAfterViewChecked() {
    let editor = this.ckEditor.instance;
    editor.config.height = '100';
/*     editor.config.toolbarGroups = [{ name: 'document', groups: ['mode', 'document', 'doctools'] },
    { name: 'clipboard', groups: ['clipboard', 'undo'] },
    { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] }]
  } */

  }
}
