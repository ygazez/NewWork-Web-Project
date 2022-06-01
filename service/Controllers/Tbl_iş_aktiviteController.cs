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
    public class Tbl_iş_aktiviteController : Controller
    {
        private Proje1Entities db = new Proje1Entities();

        // GET: Tbl_iş_aktivite
        public ActionResult Index()
        {
            return View(db.Tbl_iş_aktivite.ToList());
        }

        // GET: Tbl_iş_aktivite/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_iş_aktivite tbl_iş_aktivite = db.Tbl_iş_aktivite.Find(id);
            if (tbl_iş_aktivite == null)
            {
                return HttpNotFound();
            }
            return View(tbl_iş_aktivite);
        }

        // GET: Tbl_iş_aktivite/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Tbl_iş_aktivite/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "iş_aktivite_ID,iş_aktivite_durumu")] Tbl_iş_aktivite tbl_iş_aktivite)
        {
            if (ModelState.IsValid)
            {
                db.Tbl_iş_aktivite.Add(tbl_iş_aktivite);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(tbl_iş_aktivite);
        }

        // GET: Tbl_iş_aktivite/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_iş_aktivite tbl_iş_aktivite = db.Tbl_iş_aktivite.Find(id);
            if (tbl_iş_aktivite == null)
            {
                return HttpNotFound();
            }
            return View(tbl_iş_aktivite);
        }

        // POST: Tbl_iş_aktivite/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "iş_aktivite_ID,iş_aktivite_durumu")] Tbl_iş_aktivite tbl_iş_aktivite)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tbl_iş_aktivite).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(tbl_iş_aktivite);
        }

        // GET: Tbl_iş_aktivite/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_iş_aktivite tbl_iş_aktivite = db.Tbl_iş_aktivite.Find(id);
            if (tbl_iş_aktivite == null)
            {
                return HttpNotFound();
            }
            return View(tbl_iş_aktivite);
        }

        // POST: Tbl_iş_aktivite/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Tbl_iş_aktivite tbl_iş_aktivite = db.Tbl_iş_aktivite.Find(id);
            db.Tbl_iş_aktivite.Remove(tbl_iş_aktivite);
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
