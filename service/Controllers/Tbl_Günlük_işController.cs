using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using NEWWORK;
using NEWWORK.Cors;

namespace NEWWORK.Controllers
{
    
    public class Tbl_Günlük_işController : Controller
    {

       
        private Proje1Entities db = new Proje1Entities();

        // GET: Tbl_Günlük_iş
        public ActionResult Index()
        {
            Console.WriteLine("girdi");

            var tbl_Günlük_iş = db.Tbl_Günlük_iş.Include(t => t.Tbl_iş_aktivite).Include(t => t.Tbl_iş_Durumu).Include(t => t.Tbl_Kategori);
            List<Tbl_Günlük_iş> gunlukIsList = new List<Tbl_Günlük_iş>();
            foreach (Tbl_Günlük_iş günlük_İş in tbl_Günlük_iş.ToList())
            {
                var kategori = new Tbl_Kategori
                {
                    Kategori_ID = günlük_İş.Tbl_Kategori.Kategori_ID,
                    Kategori_Adi = günlük_İş.Tbl_Kategori.Kategori_Adi
                };
                var iş_durumu = new Tbl_iş_Durumu
                {
                    iş_Durum_ID = günlük_İş.Tbl_iş_Durumu.iş_Durum_ID,
                    iş_onay_durumu = günlük_İş.Tbl_iş_Durumu.iş_onay_durumu
                };
                var iş_aktivite = new Tbl_iş_aktivite
                {
                    iş_aktivite_ID = günlük_İş.Tbl_iş_aktivite.iş_aktivite_ID,
                    iş_aktivite_durumu = günlük_İş.Tbl_iş_aktivite.iş_aktivite_durumu
                };
                günlük_İş.Tbl_Kategori = kategori;
                günlük_İş.Tbl_iş_Durumu = iş_durumu;
                günlük_İş.Tbl_iş_aktivite = iş_aktivite;
                gunlukIsList.Add(günlük_İş);
            }
            return Json(gunlukIsList, JsonRequestBehavior.AllowGet);
        }

        // GET: Tbl_Günlük_iş/Details/5
        
        public ActionResult Details(int? id)
        {

            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Günlük_iş tbl_Günlük_iş = db.Tbl_Günlük_iş.Find(id);

            if (tbl_Günlük_iş == null)
            {
                return HttpNotFound();
            }

            var kategori = new Tbl_Kategori
            {
                Kategori_ID = tbl_Günlük_iş.Tbl_Kategori.Kategori_ID,
                Kategori_Adi = tbl_Günlük_iş.Tbl_Kategori.Kategori_Adi

            };
            var iş_durumu = new Tbl_iş_Durumu
            {
                iş_Durum_ID = tbl_Günlük_iş.Tbl_iş_Durumu.iş_Durum_ID,
                iş_onay_durumu = tbl_Günlük_iş.Tbl_iş_Durumu.iş_onay_durumu

            };
            var iş_aktivite = new Tbl_iş_aktivite
            {
                iş_aktivite_ID = tbl_Günlük_iş.Tbl_iş_aktivite.iş_aktivite_ID,

                iş_aktivite_durumu = tbl_Günlük_iş.Tbl_iş_aktivite.iş_aktivite_durumu

            };
            tbl_Günlük_iş.Tbl_Kategori = kategori;
            tbl_Günlük_iş.Tbl_iş_Durumu = iş_durumu;
            tbl_Günlük_iş.Tbl_iş_aktivite = iş_aktivite;

            return Json(tbl_Günlük_iş, JsonRequestBehavior.AllowGet);
        }
        
        // GET: Tbl_Günlük_iş/Create
        
        public ActionResult Create()
        {
            ViewBag.iş_aktivite_ID = new SelectList(db.Tbl_iş_aktivite, "iş_aktivite_ID", "iş_aktivite_durumu");
            ViewBag.iş_Durum_ID = new SelectList(db.Tbl_iş_Durumu, "iş_Durum_ID", "iş_onay_durumu");
            ViewBag.Kategori_ID = new SelectList(db.Tbl_Kategori, "Kategori_ID", "Kategori_Adi");
            return View();
        }
        
        // POST: Tbl_Günlük_iş/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        
        [HttpPost]
        
        public ActionResult Create(Tbl_Günlük_iş tbl_Günlük_iş)
        {
            Tbl_Kategori tbl_Kategori = db.Tbl_Kategori.Where(k => k.Kategori_ID == tbl_Günlük_iş.Kategori_ID).FirstOrDefault();
            tbl_Günlük_iş.Tbl_Kategori = tbl_Kategori;
            Tbl_iş_aktivite tbl_iş_aktivite = db.Tbl_iş_aktivite.Where(i => i.iş_aktivite_ID == tbl_Günlük_iş.iş_aktivite_ID).FirstOrDefault();
            tbl_Günlük_iş.Tbl_iş_aktivite = tbl_iş_aktivite;
            Tbl_iş_Durumu tbl_İş_Durumu = db.Tbl_iş_Durumu.Where(d => d.iş_Durum_ID == tbl_Günlük_iş.iş_Durum_ID).FirstOrDefault();
            tbl_Günlük_iş.Tbl_iş_Durumu = tbl_İş_Durumu;
            tbl_Günlük_iş.Tarih = tbl_Günlük_iş.Tarih;
            

           

            if (ModelState.IsValid)
            {
                Console.WriteLine("girdi");
                db.Tbl_Günlük_iş.Add(tbl_Günlük_iş);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.iş_aktivite_ID = new SelectList(db.Tbl_iş_aktivite, "iş_aktivite_ID", "iş_aktivite_durumu",tbl_Günlük_iş.iş_aktivite_ID);
            ViewBag.iş_Durum_ID = new SelectList(db.Tbl_iş_Durumu, "iş_Durum_ID", "iş_onay_durumu",tbl_Günlük_iş.iş_Durum_ID);
            ViewBag.Kategori_ID = new SelectList(db.Tbl_Kategori, "Kategori_ID", "Kategori_Adi",tbl_Günlük_iş.Kategori_ID);

            return View(tbl_Günlük_iş);
        }
        
        // GET: Tbl_Günlük_iş/Edit/5
        public ActionResult Edit(int? id)
        {

            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Günlük_iş tbl_Günlük_iş = db.Tbl_Günlük_iş.Find(id);
            if (tbl_Günlük_iş == null)
            {
                return HttpNotFound();
            }
            ViewBag.iş_aktivite_ID = new SelectList(db.Tbl_iş_aktivite, "iş_aktivite_ID", "iş_aktivite_durumu", tbl_Günlük_iş.iş_aktivite_ID);
            ViewBag.iş_Durum_ID = new SelectList(db.Tbl_iş_Durumu, "iş_Durum_ID", "iş_onay_durumu", tbl_Günlük_iş.iş_Durum_ID);
            ViewBag.Kategori_ID = new SelectList(db.Tbl_Kategori, "Kategori_ID", "Kategori_Adi", tbl_Günlük_iş.Kategori_ID);
            return View(tbl_Günlük_iş);
        }

        // POST: Tbl_Günlük_iş/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public ActionResult Edit(int id,Tbl_Günlük_iş tbl_Günlük_iş)
        {
            // Veritabanında kayıtlı olan ve güncellenecek olan Tbl_Günlük_iş objesini bulmak için
            Tbl_Günlük_iş updated_tbl_Günlük_İş = db.Tbl_Günlük_iş.Where(k => k.iş_ID == id).FirstOrDefault();

            updated_tbl_Günlük_İş.Konum = tbl_Günlük_iş.Konum;
            

            Tbl_Kategori tbl_Kategori = db.Tbl_Kategori.Where(k => k.Kategori_ID == tbl_Günlük_iş.Kategori_ID).FirstOrDefault();
            updated_tbl_Günlük_İş.Tbl_Kategori = tbl_Kategori;

            Tbl_iş_aktivite tbl_iş_aktivite = db.Tbl_iş_aktivite.Where(i => i.iş_aktivite_ID == tbl_Günlük_iş.iş_aktivite_ID).FirstOrDefault();
            updated_tbl_Günlük_İş.Tbl_iş_aktivite = tbl_iş_aktivite;
            Tbl_iş_Durumu tbl_İş_Durumu = db.Tbl_iş_Durumu.Where(d => d.iş_Durum_ID == tbl_Günlük_iş.iş_Durum_ID).FirstOrDefault();
            updated_tbl_Günlük_İş.Tbl_iş_Durumu = tbl_İş_Durumu;

            updated_tbl_Günlük_İş.iş_gün_sayısı = tbl_Günlük_iş.iş_gün_sayısı;
            updated_tbl_Günlük_İş.Tarih = tbl_Günlük_iş.Tarih;
           

            db.Entry(updated_tbl_Günlük_İş).State = EntityState.Modified;
            db.SaveChanges();

            ViewBag.iş_aktivite_ID = new SelectList(db.Tbl_iş_aktivite, "iş_aktivite_ID", "iş_aktivite_durumu", updated_tbl_Günlük_İş.iş_aktivite_ID);
            ViewBag.iş_Durum_ID = new SelectList(db.Tbl_iş_Durumu, "iş_Durum_ID", "iş_onay_durumu", updated_tbl_Günlük_İş.iş_Durum_ID);
            ViewBag.Kategori_ID = new SelectList(db.Tbl_Kategori, "Kategori_ID", "Kategori_Adi", updated_tbl_Günlük_İş.Kategori_ID);
            return View(updated_tbl_Günlük_İş);
        }

        // GET: Tbl_Günlük_iş/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Günlük_iş tbl_Günlük_iş = db.Tbl_Günlük_iş.Find(id);
            if (tbl_Günlük_iş == null)
            {
                return HttpNotFound();
            }
            return View(tbl_Günlük_iş);
        }

        // POST: Tbl_Günlük_iş/Delete/5
        [HttpPost, ActionName("Delete")]
        
        public ActionResult DeleteConfirmed(int id)
        {
            Tbl_Günlük_iş tbl_Günlük_iş = db.Tbl_Günlük_iş.Find(id);
            db.Tbl_Günlük_iş.Remove(tbl_Günlük_iş);
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
