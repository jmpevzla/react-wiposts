import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkDraftPostApi, createPostApi } from "@/post/data/postService";
import { useFormik } from "formik";
import Options from "./Options";
import { PostsList, PostSearch } from "../types";
import { getPostsApi } from "../data/homeService";

export default HomeView;

function HomeView() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("");

  const [list, setList] = useState<PostsList | null>(null)
  const navigate = useNavigate();

  function initValues(): PostSearch 
  {
    return {
      search: '',
      page: 1,
      descriptionFt: '',
      hashtagsFt: '',
      photoDtFromFt: '',
      photoDtUntilFt: '',
      createdAtFromFt: '',
      createdAtUntilFt: '',
      updatedAtFromFt: '',
      updatedAtUntilFt: '',
      nameFt: '',
      usernameFt: '',
      sort: [
        { description: '' },
        { hashtags: '' },
        { photoDatetime: '' },
        { createdAt: '' },
        { updatedAt: '' },
        { user_name: '' },
        { user_username: '' },
      ]
      // descriptionSt: '',
      // hashtagsSt: '',
      // photoDatetimeSt: '',
      // createdAtSt: '',
      // updatedAtSt: '',
      // user_nameSt: '',
      // user_usernameSt: ''
    }
  }

  const formik = useFormik({
    initialValues: initValues(),
    onSubmit: async (values) => {
      try {
        setIsLoading(true)
        const result = await getPostsApi(values)
        console.log(result)
        setList(result.info)

      } catch(err: any) {
        console.error(err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    },
  });

  const handleSort = (ev: React.ChangeEvent<any>) => {
    const target = ev.currentTarget
    const field = target.name.replace('sort_', '')
    const value = target.value
    
    const sort = formik.values.sort.slice()
    const index = sort.findIndex(value => {
      return Object.keys(value)[0] === field
    })

    sort[index] = { [field]: value }
    formik.setFieldValue('sort', sort)
  }

  const setTabFunc = (value: string) => {
    setTab(value)
    if (value === '') {
      formik.setValues({
        ...initValues(),
        search: formik.values.search
      })
    }
  }

  const onPage = (value: number) => {
    const page = formik.values.page + value
    if (page > 0) {
      formik.setFieldValue('page', formik.values.page + value)
    }
  }

  const onCreatePost = async () => {
    try {
      setIsLoading(true);
      setError("");
      const checkedResult = await checkDraftPostApi();
      console.log(checkedResult);
      const infoDraft = checkedResult.info;
      const toPhoto = (id: number) => `/post/${id}/create/photo`;
      const toInfo = (id: number) => `/post/${id}/create/info`;

      if (infoDraft) {
        switch (infoDraft.status) {
          case "CREATED":
            return navigate(toPhoto(infoDraft.id));
          case "PHOTO":
            return navigate(toInfo(infoDraft.id));
        }
      }

      const { info } = await createPostApi();
      console.log("OK Created");
      navigate(toPhoto(info!.id));
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <h1>Wiposts!</h1>

      <div>
        <a href="/profile" className="link">
          Profile
        </a>
      </div>

      <div className="mt-2">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-row">
            <input
              type="search"
              name="search"
              className="form-control input input-primary w-full"
              value={formik.values.search}
              onChange={formik.handleChange}
            />
            <button type="submit" className="btn btn-primary ml-2">
              Search
            </button>
            <button
              type="button"
              className="btn btn-primary ml-2"
              onClick={onCreatePost}
            >
              Create
            </button>
          </div>

          <label htmlFor="my-modal" className="btn modal-button">Options</label>
          <input type="checkbox" id="my-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <Options formik={formik} tab={tab} setTab={setTabFunc} handleChangeSort={handleSort} />
              <div className="modal-action">
                <label htmlFor="my-modal" className="btn btn-pr"
                  onClick={() => formik.handleSubmit()}>Search</label>
                  <label htmlFor="my-modal" className="btn">Cancel</label>
              </div>
            </div>
          </div>

          <button 
            type="button"
            className="ml-3 btn"
            onClick={() => onPage(-1)}>
            &lt;&lt;
          </button>
          <span className="font-bold mx-2">{formik.values.page}</span>
          <button 
            type="button"
            className="btn"
            onClick={() => onPage(1)}>
            &gt;&gt;
          </button>
        </form>
      </div>

      <div>
        {list && list.posts.map((value) => (
          <article 
            key={value.id}
            className="mt-2 border-2 border-primary p-2">
            <div className="flex flex-row">
              <img className="w-14" src={value.user.photo} />
              <p>
                <span className="font-bold">@{value.user.username}</span> 
                <span>({value.user.name})</span>
              </p>
            </div>

            <div>
              <img className="w-28" src={value.photo} />
              <p>{value.description}</p>
              <p>{value.hashtags}</p>
              <div className="flex justify-around">
                <p>Date Took it: {value.photoDatetime}</p>
                <p>Date Published: {value.createdAt}</p>
                <p>Date Updated: {value.updatedAt}</p>
              </div>
            </div>
          </article>
        ))}
        
      </div>
    </section>
  );
}
