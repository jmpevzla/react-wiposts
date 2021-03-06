import classNames from "classnames"

export default Options

function Options({ formik, tab, setTab, handleChangeSort }: any) {
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
            name="ft_description"
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
            name="ft_hashtags"
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
            name="ft_photoDtFrom"
            type="datetime-local"
            className="block input input-primary" 
            value={formik.values.photoDtFromFt}
            onChange={formik.handleChange}
            />
        </div>
        <div className="mt-2">
          <label htmlFor="inputPhotoUntilFt" className="mr-2">
            Photo Until:
          </label>
          <input
            id="inputPhotoUntilFt"
            name="ft_photoDtUntil"
            type="datetime-local"
            className="block input input-primary" 
            value={formik.values.photoDtUntilFt}
            onChange={formik.handleChange}
            />
        </div>

        <div className="mt-2">
          <label htmlFor="inputCreatedAtFromFt" className="mr-2">
            Created At From:
          </label>
          <input
            id="inputCreatedAtFromFt"
            name="ft_createdAtFrom"
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
            name="ft_createdAtUntil"
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
            name="ft_updatedAtFrom"
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
            name="ft_updatedAtUntil"
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
            name="ft_user_name"
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
            name="ft_user_username"
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
            name="sort_description"
            className="select select-primary"
            value={formik.values.sort[0].description}
            onChange={handleChangeSort}
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
            name="sort_hashtags"
            className="select select-primary"
            value={formik.values.sort[1].hashtags}
            onChange={handleChangeSort}
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
            name="sort_photoDatetime"
            className="select select-primary"
            value={formik.values.sort[2].photoDatetime}
            onChange={handleChangeSort}
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
            name="sort_createdAt"
            className="select select-primary"
            value={formik.values.sort[3].createdAt}
            onChange={handleChangeSort}
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
            name="sort_updatedAt"
            className="select select-primary"
            value={formik.values.sort[4].updatedAt}
            onChange={handleChangeSort}
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
            name="sort_user_name"
            className="select select-primary"
            value={formik.values.sort[5].user_name}
            onChange={handleChangeSort}
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
            name="sort_user_username"
            className="select select-primary"
            value={formik.values.sort[6].user_username}
            onChange={handleChangeSort}
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