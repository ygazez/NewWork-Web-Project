//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace NEWWORK
{
    using System;
    using System.Collections.Generic;
    
    public partial class Tbl_Günlük_iş
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Tbl_Günlük_iş()
        {
            this.Tbl_iş_işlem = new HashSet<Tbl_iş_işlem>();
        }
    
        public int iş_ID { get; set; }
        public int Kategori_ID { get; set; }
        public string Konum { get; set; }
        [System.ComponentModel.DataAnnotations.Schema.Column(TypeName = "datetime2")]
        public System.DateTime Tarih { get; set; }
        public int iş_gün_sayısı { get; set; }
        public int iş_aktivite_ID { get; set; }
        public int iş_Durum_ID { get; set; }
    
        public virtual Tbl_iş_aktivite Tbl_iş_aktivite { get; set; }
        public virtual Tbl_iş_Durumu Tbl_iş_Durumu { get; set; }
        public virtual Tbl_Kategori Tbl_Kategori { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Tbl_iş_işlem> Tbl_iş_işlem { get; set; }
    }
}
