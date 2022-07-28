import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkDraftPostApi, createPostApi } from "@/post/data/postService";
import { useFormik } from "formik";
import Options from "./Options";

export default HomeView;

function HomeView() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("");

  const formatDate = (date: string) => {
    const dt = new Date(date)
    const df = Intl.DateTimeFormat([], {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    })
    return df.format(dt)
  }

  const [posts, setPosts] = useState([{
    id: 1,
    photo: 'http://localhost:4000/public/uploads/users/photo-1658040750855-11642152.jpg',
    description: 'a new web site',
    hashtags: '#website',
    createdAt: formatDate(new Date().toISOString()),
    updatedAt: formatDate(new Date().toISOString()),
    photoDatetime: formatDate(new Date().toISOString()),
    user: {
      name: 'Bob Martin',
      photo: 'http://localhost:4000/public/uploads/users/photo-1658040750855-11642152.jpg',
      username: 'bobmartin'
    }
  }])
  const navigate = useNavigate();

  const initValues = () => {
    return {
      search: '',
      descriptionFt: '',
      hashtagsFt: '',
      photoFromFt: '',
      photoUntilFt: '',
      createdAtFromFt: '',
      createdAtUntilFt: '',
      updatedAtFromFt: '',
      updatedAtUntilFt: '',
      nameFt: '',
      usernameFt: '',
      descriptionSt: '',
      hashtagsSt: '',
      photoSt: '',
      createdAtSt: '',
      updatedAtSt: '',
      nameSt: '',
      usernameSt: ''
    }
  }

  const formik = useFormik({
    initialValues: initValues(),
    onSubmit: async (values) => {
      console.log(values)
    },
  });

  const setTabFunc = (value: string) => {
    setTab(value)
    if (value === '') {
      formik.setValues({
        ...initValues(),
        search: formik.values.search
      })
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
              <Options formik={formik} tab={tab} setTab={setTabFunc} />
              <div className="modal-action">
                <label htmlFor="my-modal" className="btn btn-pr"
                  onClick={() => formik.handleSubmit()}>Search</label>
                  <label htmlFor="my-modal" className="btn">Cancel</label>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div>
        {posts && posts.map((value) => (
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
