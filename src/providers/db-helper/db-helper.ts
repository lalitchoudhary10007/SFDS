import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppUtilsProvider } from '../app-utils/app-utils';

/*
  Generated class for the DbHelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbHelperProvider {

  public db: SQLiteObject;

  constructor(public sqlite: SQLite, public appUtils: AppUtilsProvider) {
    console.log('Hello DbHelperProvider Provider');


  }

  CreateJobsTable() {

    this.sqlite.create({
      name: 'SFDS.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql('CREATE TABLE IF NOT EXISTS Jobs(jobId TEXT, jobNumber TEXT, jobName TEXT, freqValue BOOLEAN)', [])
          .then(res => {
            console.log('**JOBS ENTITY CREATED')
            this.CreateFormSubmissionTable();
          })
          .catch(e => console.log(e));
      })

  }

  CreateFormSubmissionTable() {

    this.db.executeSql('CREATE TABLE IF NOT EXISTS FormSubmission(id INTEGER PRIMARY KEY, FormJSON TEXT, FormType TEXT, FormID INTEGER , FormSubmissionPrimaryKey TEXT ,  createdAt TEXT, updatedAt TEXT , FormStatus TEXT , SubmittedBy TEXT , SubmittedJob TEXT)', [])
      .then(res => {
        console.log('**FormSubmission ENTITY CREATED')
        this.CreateFormTemplatesTable();
      })
      .catch(e => console.log(e));

  }

  CreateFormTemplatesTable() {

    this.db.executeSql('CREATE TABLE IF NOT EXISTS FormTemplate(id INTEGER PRIMARY KEY, TemplateName TEXT , FormJSON TEXT, FormType TEXT, FormID INTEGER , defaultTemp INTEGER)', [])
      .then(res => {
        console.log('**FormTemplate ENTITY CREATED')
        this.CreateChangeLogTable();
      })
      .catch(e => console.log(e));

  }


  CreateChangeLogTable() {

    this.db.executeSql('CREATE TABLE IF NOT EXISTS ChangeLog(id INTEGER PRIMARY KEY, FormType TEXT , Action TEXT, SubmissionId TEXT, Synced BOOLEAN , CreatedAt TEXT)', [])
      .then(res => {
        console.log('**ChangeLog ENTITY CREATED')

      })
      .catch(e => console.log(e));

  }


  SaveFormTemplate(form_type, form_id, tempName, FormJSON, query, defaultform) {
    this.db.executeSql(query, [tempName, JSON.stringify(FormJSON), form_type, form_id, defaultform])
      .then(res => {
        console.log("template SAVED" + form_type, res.insertId);

      })
      .catch(e => {
        console.log(e);
      });

  }

  SaveNewChangeLog(formtype, subID, action) {

    var now = this.appUtils.GetCurrentDateTime();

    let query = 'INSERT INTO ChangeLog VALUES(null,?,?,?,?,?)';
    this.db.executeSql(query, [formtype, action, subID, false, now])
      .then(res => {
        console.log("ChangeLog SAVED", res);
      })
      .catch(e => {
        console.log(e);
      });

  }

  UpdateChangeLogStatus(changeLogID, syncedResult, submissionID) {

    this.db.executeSql('UPDATE ChangeLog SET Synced=? WHERE id=?', [true, changeLogID])
      .then(updateres => {
        console.log("##ChangeLOG UPDate", updateres);
      })
      .catch(e => console.log(e));

  }

  UpdateFormSubmissionIdAndStatus(FormSubMissionId, syncResult, changeLogID) {
    let now = this.appUtils.GetCurrentDateTime();
    return Observable.create(observer => {
    console.log("##DATA FOR FORM SUBMISSION" , FormSubMissionId , syncResult , changeLogID);  
    this.db.executeSql('UPDATE FormSubmission SET FormSubmissionPrimaryKey=?,FormStatus=?,updatedAt=? WHERE id=?', [syncResult.details.entityID, 'Synced', now , FormSubMissionId])
      .then(updateres => {
       this.db.executeSql('UPDATE ChangeLog SET Synced=? WHERE id=?', [true, changeLogID])
          .then(updateres => {
            observer.next(updateres);
            console.log("##ChangeLOG UPDate", updateres);
          });
          
      })
      .catch(e => console.log(e));
    }, );
  }


  GetAllChangeLog(synced) {
    let query = 'SELECT * FROM ChangeLog WHERE Synced=? ORDER BY CreatedAt ASC';
    return Observable.create(observer => {
      this.db.executeSql(query, [synced])
        .then(res => {
          console.log("**", res);
          observer.next(res);
        })
        .catch(e => {
          observer.next(e);
          console.log(e);
        });

    }, );

  }

  GetAllInsertChangeLogs(synced, Action) {
    let query = 'SELECT * FROM ChangeLog WHERE Synced=? AND Action=? ORDER BY CreatedAt ASC';
    return Observable.create(observer => {
      this.db.executeSql(query, [synced, Action])
        .then(res => {
          console.log("**", res);
          observer.next(res);
        })
        .catch(e => {
          observer.next(e);
          console.log(e);
        });

    }, );

  }




  SaveNewForm(form_type, form_id, formSubmissionPK, FormJSON, status, submittedBy, jobCode) {

    var d = this.appUtils.GetCurrentDateTime();
    let query1 = 'INSERT INTO FormSubmission VALUES(null,?,?,?,?,?,?,?,?,?)' ;

    this.db.executeSql(query1, [JSON.stringify(FormJSON), form_type, form_id, formSubmissionPK, d, d, status, submittedBy, jobCode])
      .then(res => {
        console.log("form SAVED" + form_type, res.insertId);
        if(status === 'Ready To Submit'){
          this.SaveNewChangeLog(form_type, res.insertId, "INSERT");
        }
      })
      .catch(e => {
        console.log(e);
      });

  }


  UpdateExistForm(primaryKeyForm, Form_type, query, FormJson, updatedAt, status, submittedBy) {

    this.db.executeSql(query, [JSON.stringify(FormJson), updatedAt, status, submittedBy, primaryKeyForm])
      .then(res => {
        console.log("form Updated" + query, res);
        if(status === 'Ready To Submit'){
          this.SaveNewChangeLog(Form_type, primaryKeyForm, "INSERT");
        }
      })
      .catch(e => {
        console.log(e);
      });

  }


  GetSavedForms(query, id , jobIdss) {
    return Observable.create(observer => {
      this.db.executeSql(query, [id , jobIdss])
        .then(res => {
          console.log("**", res);
          observer.next(res);
        })
        .catch(e => {
          observer.next(e);
          console.log(e);
        });

    }, );

  }

  GetSavedFormsFromPKId(PKid) {

    let query = 'SELECT * FROM FormSubmission WHERE id=?';
    return Observable.create(observer => {
      this.db.executeSql(query, [PKid])
        .then(res => {
          console.log("**", res);
          observer.next(res);
        })
        .catch(e => {
          observer.next(e);
          console.log(e);
        });

    }, );
  }


  SaveJobs(data) {

    return Observable.create(observer => {
      let insertRows = [];
      data.forEach(item => {
        insertRows.push([
          'INSERT INTO Jobs VALUES(?,?,?,?)',
          [item.code, item.jobNumber, item.jobName, false]
        ]);
      });
      this.db.sqlBatch(insertRows).then((result) => {
        observer.next("SUCCESS");
        observer.complete();
      }).catch(e => {
        console.log(e);
        observer.throw(e);
      });
    }, );

  }

  UpdateFreqOfJob(jobid, freq_value) {

    this.db.executeSql('UPDATE Jobs SET freqValue=? WHERE jobId=?', [freq_value, jobid])
      .then(updateres => {
        console.log("UPDATED", updateres);
      })
      .catch(e => console.log(e));

  }

  GetAllJobs() {

    return Observable.create(observer => {
      this.db.executeSql('SELECT * FROM Jobs ORDER BY freqValue DESC', [])
        .then(res => {
          observer.next(res);
        })
        .catch(e => {
          observer.next(e);
          console.log(e);
        });

    }, );

  }

  GetAllTemplates(formID) {

    return Observable.create(observer => {
      this.db.executeSql('SELECT * FROM FormTemplate WHERE FormID=? ORDER BY defaultTemp DESC', [formID])
        .then(res => {
          observer.next(res);
        })
        .catch(e => {
          observer.next(e);
          console.log(e);
        });

    }, );

  }





}
