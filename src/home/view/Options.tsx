import classNames from "classnames"

export default Options

function Options({ formik, tab, setTab }: any) {
  return (
    <div>
    <div className="tabs">
      <a
        className={classNames("tab", "tab-bordered", {
          "tab-active": tab === "",
        })}
        onClick={() => setTab("")}
      >
        None
      </a>
      <a
        className={classNames("tab", "tab-bordered", {
          "tab-active": tab === "filters",
        })}
        onClick={() => setTab("filters")}
      >
        Filters
      </a>
      <a
        className={classNames("tab", "tab-bordered", {
          "tab-active": tab === "sort",
        })}
        onClick={() => setTab("sort")}
      >
        Sort
      </a>
    </div>

    {tab === "" && (
      <div className="mt-2">
        <div>
          <label htmlFor="inputSearch" className="mr-2">
            Search:
          </label>
          <input
            id="inputSearch"
            name="search"
            className="form-control input input-primary w-full" 
            value={formik.values.search}
            onChange={formik.handleChange} />
        </div>
      </div>
    )}

    {tab === "filters" && (
      <div className="mt-2">
        <div>
          <label htmlFor="inputDescFt" className="mr-2">
            Description:
          </label>
          <input
            id="inputDescFt"
            name="descriptionFt"
            className="form-control input input-primary" 
            value={formik.values.descriptionFt}
            onChange={formik.handleChange} />
        </div>

        <div className="mt-2">
          <label htmlFor="inputHashFt" className="mr-2">
            Hashtags:
          </label>
          <input
            id="inputHashFt"
            name="hashtagsFt"
            className="form-control input input-primary" 
            value={formik.values.hashtagsFt}
            onChange={formik.handleChange}
            />
        </div>

        <div className="mt-2">
          <label htmlFor="inputPhotoFromFt" className="mr-2">
            Photo From:
          </label>
          <input
            id="inputPhotoFromFt"
            name="photoFromFt"
            type="datetime-local"
            className="block input input-primary" 
            value={formik.values.photoFromFt}
            onChange={formik.handleChange}
            />
        </div>
        <div className="mt-2">
          <label htmlFor="inputPhotoUntilFt" className="mr-2">
            Photo Until:
          </label>
          <input
            id="inputPhotoUntilFt"
            name="photoUntilFt"
            type="datetime-local"
            className="block input input-primary" 
            value={formik.values.photoUntilFt}
            onChange={formik.handleChange}
            />
        </div>

        <div className="mt-2">
          <label htmlFor="inputCreatedAtFromFt" className="mr-2">
            Created At From:
          </label>
          <input
            id="inputCreatedAtFromFt"
            name="createdAtFromFt"
            type="datetime-local"
            className="block input input-primary" 
            value={formik.values.createdAtFromFt}
            onChange={formik.handleChange}
            />
        </div>
        <div className="mt-2">
          <label htmlFor="inputCreatedAtUntilFt" className="mr-2">
            Created At Until:
          </label>
          <input
            id="inputCreatedAtUntilFt"
            name="createdAtUntilFt"
            type="datetime-local"
            className="block input input-primary" 
            value={formik.values.createdAtUntilFt}
            onChange={formik.handleChange}
            />
        </div>

        <div className="mt-2">
          <label htmlFor="inputUpdatedAtFromFt" className="mr-2">
            Updated At From:
          </label>
          <input
            id="inputUpdatedAtFromFt"
            name="updatedAtFromFt"
            type="datetime-local"
            className="block input input-primary" 
            value={formik.values.updatedAtFromFt}
            onChange={formik.handleChange}
            />
        </div>
        <div className="mt-2">
          <label htmlFor="inputUpdatedAtUntilFt" className="mr-2">
            Updated At Until:
          </label>
          <input
            id="inputUpdatedAtUntilFt"
            name="updatedAtUntilFt"
            type="datetime-local"
            className="block input input-primary" 
            value={formik.values.updatedAtUntilFt}
            onChange={formik.handleChange}
            />
        </div>

        <div className="mt-2">
          <label htmlFor="inputNameFt" className="mr-2">
            Name:
          </label>
          <input
            id="inputNameFt"
            name="nameFt"
            className="form-control input input-primary" 
            value={formik.values.nameFt}
            onChange={formik.handleChange}
            />
        </div>

        <div className="mt-2">
          <label htmlFor="inputUsernameFt" className="mr-2">
            Username:
          </label>
          <input
            id="inputUsernameFt"
            name="usernameFt"
            className="form-control input input-primary"
            value={formik.values.usernameFt}
            onChange={formik.handleChange}
          />
        </div>
      </div>
    )}

    {tab === "sort" && (
      <div className="mt-2">
        <div>
          <label htmlFor="selectDesc" className="mr-2">
            Description:
          </label>
          <select
            id="selectDesc"
            name="descriptionSt"
            className="select select-primary"
            value={formik.values.descriptionSt}
            onChange={formik.handleChange}
          >
            <option value=""></option>
            <option value="asc">&darr; ASC</option>
            <option value="desc">&uarr; DESC</option>
          </select>
        </div>

        <div className="mt-2">
          <label htmlFor="selectHash" className="mr-2">
            Hashtags:
          </label>
          <select
            id="selectHash"
            name="hashtagsSt"
            className="select select-primary"
            value={formik.values.hashtagsSt}
            onChange={formik.handleChange}
          >
            <option value=""></option>
            <option value="asc">&darr; ASC</option>
            <option value="desc">&uarr; DESC</option>
          </select>
        </div>

        <div className="mt-2">
          <label htmlFor="selectPhotoDt" className="mr-2">
            Photo datetime:
          </label>
          <select
            id="selectPhotoDt"
            name="photoSt"
            className="select select-primary"
            value={formik.values.photoSt}
            onChange={formik.handleChange}
          >
            <option value=""></option>
            <option value="asc">&darr; ASC</option>
            <option value="desc">&uarr;DESC</option>
          </select>
        </div>

        <div className="mt-2">
          <label htmlFor="selectCreatedAt" className="mr-2">
            Created At:
          </label>
          <select
            id="selectCreatedAt"
            name="createdAtSt"
            className="select select-primary"
            value={formik.values.createdAtSt}
            onChange={formik.handleChange}
          >
            <option value=""></option>
            <option value="asc">&darr; ASC</option>
            <option value="desc">&uarr;DESC</option>
          </select>
        </div>

        <div className="mt-2">
          <label htmlFor="selectUpdatedAt" className="mr-2">
            Updated At:
          </label>
          <select
            id="selectUpdatedAt"
            name="updatedAtSt"
            className="select select-primary"
            value={formik.values.updatedAtSt}
            onChange={formik.handleChange}
          >
            <option value=""></option>
            <option value="asc">&darr; ASC</option>
            <option value="desc">&uarr;DESC</option>
          </select>
        </div>

        <div className="mt-2">
          <label htmlFor="selectName" className="mr-2">
            Name:
          </label>
          <select
            id="selectName"
            name="nameSt"
            className="select select-primary"
            value={formik.values.nameSt}
            onChange={formik.handleChange}
          >
            <option value=""></option>
            <option value="asc">&darr; ASC</option>
            <option value="desc">&uarr;DESC</option>
          </select>
        </div>

        <div className="mt-2">
          <label htmlFor="selectUsername" className="mr-2">
            Username:
          </label>
          <select
            id="selectUsername"
            name="usernameSt"
            className="select select-primary"
            value={formik.values.usernameSt}
            onChange={formik.handleChange}
          >
            <option value=""></option>
            <option value="asc">&darr; ASC</option>
            <option value="desc">&uarr;DESC</option>
          </select>
        </div>
      </div>
    )}
  </div>
  )
}