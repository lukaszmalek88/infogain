import React from "react"
import DataTable from "../components/dataTable"
import LoadButton from "../components/loadButton"
import Loader from "../components/loader"
import { useFetchData } from "../hooks/useFetchData"
import { useCallback } from "react"

export default function Home() {
  const { data, isLoading, err, fetchData } = useFetchData()


  const handleClick = useCallback(() => {
    fetchData()
  }, [fetchData])


  return (
    <div>
      {isLoading && <Loader />}

      {err && <span>{err}</span>}

      {data && <DataTable data={data} />}

      {!data &&
        <LoadButton handleClick={handleClick} />}
    </div>
  )
}
