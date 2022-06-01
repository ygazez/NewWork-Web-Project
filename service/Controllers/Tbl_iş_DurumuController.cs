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
    public class Tbl_iş_DurumuController : Controller
    {
        private Proje1Entities db = new Proje1Entities();

        // GET: Tbl_iş_Durumu
        public ActionResult Index()
        {
            return View(db.Tbl_iş_Durumu.ToList());
        }

        // GET: Tbl_iş_Durumu/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_iş_Durumu tbl_iş_Durumu = db.Tbl_iş_Durumu.Find(id);
            if (tbl_iş_Durumu == null)
            {
                return HttpNotFound();
            }
            return View(tbl_iş_Durumu);
        }

        // GET: Tbl_iş_Durumu/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Tbl_iş_Durumu/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "iş_Durum_ID,iş_onay_durumu")] Tbl_iş_Durumu tbl_iş_Durumu)
        {
            if (ModelState.IsValid)
            {
                db.Tbl_iş_Durumu.Add(tbl_iş_Durumu);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(tbl_iş_Durumu);
        }

        // GET: Tbl_iş_Durumu/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_iş_Durumu tbl_iş_Durumu = db.Tbl_iş_Durumu.Find(id);
            if (tbl_iş_Durumu == null)
            {
                return HttpNotFound();
            }
            return View(tbl_iş_Durumu);
        }

        // POST: Tbl_iş_Durumu/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "iş_Durum_ID,iş_onay_durumu")] Tbl_iş_Durumu tbl_iş_Durumu)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tbl_iş_Durumu).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(tbl_iş_Durumu);
        }

        // GET: Tbl_iş_Durumu/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_iş_Durumu tbl_iş_Durumu = db.Tbl_iş_Durumu.Find(id);
            if (tbl_iş_Durumu == null)
            {
                return HttpNotFound();
            }
            return View(tbl_iş_Durumu);
        }

        // POST: Tbl_iş_Durumu/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Tbl_iş_Durumu tbl_iş_Durumu = db.Tbl_iş_Durumu.Find(id);
            db.Tbl_iş_Durumu.Remove(tbl_iş_Durumu);
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
