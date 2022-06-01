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
    public class Tbl_iş_işlemController : Controller
    {
        private Proje1Entities db = new Proje1Entities();

        // GET: Tbl_iş_işlem
        public ActionResult Index()
        {
            var tbl_iş_işlem = db.Tbl_iş_işlem.Include(t => t.Tbl_Günlük_iş).Include(t => t.Tbl_Kullanici);
            return View(tbl_iş_işlem.ToList());
        }

        // GET: Tbl_iş_işlem/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_iş_işlem tbl_iş_işlem = db.Tbl_iş_işlem.Find(id);
            if (tbl_iş_işlem == null)
            {
                return HttpNotFound();
            }
            return View(tbl_iş_işlem);
        }

        // GET: Tbl_iş_işlem/Create
        public ActionResult Create()
        {
            ViewBag.iş_ID = new SelectList(db.Tbl_Günlük_iş, "iş_ID", "Konum");
            ViewBag.Kullanici_ID = new SelectList(db.Tbl_Kullanici, "Kullanici_ID", "Ad");
            return View();
        }

        // POST: Tbl_iş_işlem/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Kullanici_ID,iş_ID,işlem")] Tbl_iş_işlem tbl_iş_işlem)
        {
            if (ModelState.IsValid)
            {
                
                db.Tbl_iş_işlem.Add(tbl_iş_işlem);
                db.SaveChanges();
                return RedirectToAction("Index");
                
            }

            ViewBag.iş_ID = new SelectList(db.Tbl_Günlük_iş, "iş_ID", "Konum", tbl_iş_işlem.iş_ID);
            ViewBag.Kullanici_ID = new SelectList(db.Tbl_Kullanici, "Kullanici_ID", "Ad", tbl_iş_işlem.Kullanici_ID);
            return View(tbl_iş_işlem);
        }

        // GET: Tbl_iş_işlem/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_iş_işlem tbl_iş_işlem = db.Tbl_iş_işlem.Find(id);
            if (tbl_iş_işlem == null)
            {
                return HttpNotFound();
            }
            ViewBag.iş_ID = new SelectList(db.Tbl_Günlük_iş, "iş_ID", "Konum", tbl_iş_işlem.iş_ID);
            ViewBag.Kullanici_ID = new SelectList(db.Tbl_Kullanici, "Kullanici_ID", "Ad", tbl_iş_işlem.Kullanici_ID);
            return View(tbl_iş_işlem);
        }

        // POST: Tbl_iş_işlem/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Kullanici_ID,iş_ID,işlem")] Tbl_iş_işlem tbl_iş_işlem)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tbl_iş_işlem).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.iş_ID = new SelectList(db.Tbl_Günlük_iş, "iş_ID", "Konum", tbl_iş_işlem.iş_ID);
            ViewBag.Kullanici_ID = new SelectList(db.Tbl_Kullanici, "Kullanici_ID", "Ad", tbl_iş_işlem.Kullanici_ID);
            return View(tbl_iş_işlem);
        }

        // GET: Tbl_iş_işlem/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_iş_işlem tbl_iş_işlem = db.Tbl_iş_işlem.Find(id);
            if (tbl_iş_işlem == null)
            {
                return HttpNotFound();
            }
            return View(tbl_iş_işlem);
        }

        // POST: Tbl_iş_işlem/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Tbl_iş_işlem tbl_iş_işlem = db.Tbl_iş_işlem.Find(id);
            db.Tbl_iş_işlem.Remove(tbl_iş_işlem);
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
