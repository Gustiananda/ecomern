import React from "react";
import Layout from "./../components/layout/Layout";
import { useSearch } from "../context/search";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search result"}>
      <div className="container">
        <div className="text-center">
          <h1>Pencarian Produk</h1>
          <h6>
            {values?.results.length < 1
              ? "Produk Tidak Ditemukan!"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div class="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  class="card-img-top"
                  alt={p.nama}
                />
                <div class="card-body">
                  <h5 class="card-title"> {p.nama}</h5>
                  <p class="card-text">{p.description.substring(0, 30)}...</p>
                  <p class="card-text">Rp. {p.price}</p>
                  <button class="btn btn-primary ms-1">Lihat Detail</button>
                  <button class="btn btn-secondary ms-1">Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      ;
    </Layout>
  );
};

export default Search;
