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
    public class Tbl_KategoriController : Controller
    {
        private Proje1Entities db = new Proje1Entities();

        // GET: Tbl_Kategori
        public ActionResult Index()
        {
            return View(db.Tbl_Kategori.ToList());
        }

        // GET: Tbl_Kategori/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Kategori tbl_Kategori = db.Tbl_Kategori.Find(id);
            if (tbl_Kategori == null)
            {
                return HttpNotFound();
            }
            return View(tbl_Kategori);
        }

        // GET: Tbl_Kategori/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Tbl_Kategori/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Kategori_ID,Kategori_Adi")] Tbl_Kategori tbl_Kategori)
        {
            if (ModelState.IsValid)
            {
                db.Tbl_Kategori.Add(tbl_Kategori);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(tbl_Kategori);
        }

        // GET: Tbl_Kategori/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Kategori tbl_Kategori = db.Tbl_Kategori.Find(id);
            if (tbl_Kategori == null)
            {
                return HttpNotFound();
            }
            return View(tbl_Kategori);
        }

        // POST: Tbl_Kategori/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Kategori_ID,Kategori_Adi")] Tbl_Kategori tbl_Kategori)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tbl_Kategori).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(tbl_Kategori);
        }

        // GET: Tbl_Kategori/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Kategori tbl_Kategori = db.Tbl_Kategori.Find(id);
            if (tbl_Kategori == null)
            {
                return HttpNotFound();
            }
            return View(tbl_Kategori);
        }

        // POST: Tbl_Kategori/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Tbl_Kategori tbl_Kategori = db.Tbl_Kategori.Find(id);
            db.Tbl_Kategori.Remove(tbl_Kategori);
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
