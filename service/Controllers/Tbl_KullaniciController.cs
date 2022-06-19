using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using NEWWORK;

namespace NEWWORK.Controllers
{
    public class Tbl_KullaniciController : Controller
    {
        private Proje1Entities db = new Proje1Entities();

        // GET: Tbl_Kullanici
        public ActionResult Index()
        {
            return View(db.Tbl_Kullanici.ToList());
        }

        // GET: Tbl_Kullanici/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Kullanici tbl_Kullanici = db.Tbl_Kullanici.Find(id);
            if (tbl_Kullanici == null)
            {
                return HttpNotFound();
            }
            return Json(tbl_Kullanici,JsonRequestBehavior.AllowGet);
        }

        // GET: Tbl_Kullanici/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Tbl_Kullanici/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        
        public ActionResult Create( Tbl_Kullanici tbl_Kullanici)
        {
            if (ModelState.IsValid)
            {
                db.Tbl_Kullanici.Add(tbl_Kullanici);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(tbl_Kullanici);
        }

        // GET: Tbl_Kullanici/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Kullanici tbl_Kullanici = db.Tbl_Kullanici.Find(id);
            if (tbl_Kullanici == null)
            {
                return HttpNotFound();
            }
            return View(tbl_Kullanici);
        }

        // POST: Tbl_Kullanici/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
       
        public ActionResult Edit([Bind(Include = "Kullanici_ID,Ad,Soyad,Telefon,Mail,şifre")] Tbl_Kullanici tbl_Kullanici)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tbl_Kullanici).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(tbl_Kullanici);
        }

        // GET: Tbl_Kullanici/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Kullanici tbl_Kullanici = db.Tbl_Kullanici.Find(id);
            if (tbl_Kullanici == null)
            {
                return HttpNotFound();
            }
            return View(tbl_Kullanici);
        }

        // POST: Tbl_Kullanici/Delete/5
        [HttpPost, ActionName("Delete")]
        
        public ActionResult DeleteConfirmed(int id)
        {
            Tbl_Kullanici tbl_Kullanici = db.Tbl_Kullanici.Find(id);
            db.Tbl_Kullanici.Remove(tbl_Kullanici);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
