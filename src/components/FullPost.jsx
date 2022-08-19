import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RecentPosts from "../components/RecentPosts";
import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from 'dompurify';
import { request } from "../api";
import { postActions } from "../store/CommentsSlice";
import Comments from "./Comments";
import icon3 from "../assets/icon3.png";


const Container = styled.div`
  display: flex;
`;

const PostContainer = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  width: 75%;
  margin-right: 5%;
`;

const PostTitle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 150px;
`;

const Image = styled.img`
  height: 400px;
  text-align: center;
  width: 100%;
`;

const PostText = styled.div`
  margin-top: 20px;
  text-align: left;
  line-height: 35px;
`;

const About = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  // background-color: red;
  width: 20%;
`;

function FullBlogPost(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [state, setState] = useState({
        id: '', title: '', content:'', tags:{}, comments:[], comments_count:0, reader:{}, 
        coverImage:{}, created_at:'', views_count:0, loading: false, errorMsg: '', loaded: false, loadedSuccessfully: false
    });
    //const post_id = location.state;
    const post_id = useParams().id
    console.log('post_id', post_id);

    useEffect(() => {
        getPost();
    }, []);

    const createMarkup = (html) => {
      return  {
        __html: DOMPurify.sanitize(html)
      }
    }

    const getPost = async () => {
        setState({...state, loading: true});
        let post = await request('GET', '/post/show/'+post_id);
        setState({...state, loading: false, loaded: true});
        if(post.status == 200) {
            const {
                comments, comments_count, reader, content, coverImage, created_at, tags, id, title, views_count,
            } = post.data;
            setState({...state, id, title, content, tags, comments, comments_count, reader, coverImage, created_at, views_count, loadedSuccessfully: true});
        }else{
            console.log('error: ', post.message);
            setState({...state, errorMsg: post.message});
        }
    }

    const renderContent = () => {
        if(!state.loading) {
            if(state.loadedSuccessfully) {
                return (
                    // <div>
                    //     <PostTitle>
                    //         <h2>{state.title}</h2>
                    //         <span>{`Posted ${state.created_at} by Aigars`}</span>
                    //     </PostTitle>

                    //     <Image src={state.coverImage.url} alt="photo of a post" />

                    //     <div dangerouslySetInnerHTML={createMarkup(state.content)}></div>

                    //     <hr />

                    //     <div style={{textAlign: "center"}}>
                    //             <Comments comments={state.comments} post_id={state.id} />
                    //     </div>
                    // </div>
                    <div className="content sing">
                        <div className="container">
                            <div className="content-text cnt-txt">	
                                <div className="title">
                                    <div className="some-title">
                                        <h3>{state.title}</h3>
                                        <span>{`Posted ${state.created_at} by Aigars`}</span>
                                    </div>
                                    <div className="john">
                                        <p><Link to="#">John Doe</Link><span>May.26.2011</span></p>
                                    </div>
                                    <div className="clearfix"> </div>
                                    <div className="tilte-grid">
                                        <Image src={state.coverImage.url} alt="photo of a post" />
                                        <div className="Sed" dangerouslySetInnerHTML={createMarkup(state.content)}></div>
            
                                        <hr />

                                        <div style={{textAlign: "center"}}>
                                                <Comments comments={state.comments} post_id={state.id} />
                                        </div>

                                        {/* <p className="vel"><Link to="single.html">Phasellus vel arcu vitae neque sagittis aliquet ac at purus.
                                        Vestibulum varius eros in dui sagittis non ultrices orci hendrerit.
                                        enim sit amet volutpat sodales, lorem velit fringilla metus, et
                                        semper metus sapien non odio. Nulla facilisi.<Link to="#" className="gravida">Praesent gravida suscipit leo,</Link> 
                                        eget fermentum magna malesuada ac. Maecenas pulvinar malesuada elementum.</span></p>  */}
                                    </div>
                                    {/* <div className="related-posts">
                                        <h3>Related Posts</h3>
                                        <div className="related-posts-grids">
                                            <div className="related-posts-grid">
                                                <Link to="/"><img src="images/5.jpg" alt=" " /></Link>
                                                <h4><Link to="#">Maecenas pulvinar</Link></h4>
                                                <p>Nunc pulvinar augue non felis dictum ultricies. Donec lacinia, 
                                                    enim sit amet volutpat sodales, lorem velit fringilla metus, et
                                                    semper metus sapien non odio. Nulla facilisi.</p>
                                            </div>
                                            <div className="related-posts-grid">
                                                <Link to="#"><img src="images/7.jpg" alt=" " /></Link>
                                                <h4><Link to="#">Maecenas pulvinar</Link></h4>
                                                <p>Nunc pulvinar augue non felis dictum ultricies. Donec lacinia, 
                                                    enim sit amet volutpat sodales, lorem velit fringilla metus, et
                                                    semper metus sapien non odio. Nulla facilisi.</p>
                                            </div>
                                            <div className="related-posts-grid">
                                                <Link to="#"><img src="images/6.jpg" alt=" " /></Link>
                                                <h4><Link to="#">Maecenas pulvinar</Link></h4>
                                                <p>Nunc pulvinar augue non felis dictum ultricies. Donec lacinia, 
                                                    enim sit amet volutpat sodales, lorem velit fringilla metus, et
                                                    semper metus sapien non odio. Nulla facilisi.</p>
                                            </div>
                                            <div className="related-posts-grid">
                                                <Link to="#"><img src="images/8.jpg" alt=" " /></Link>
                                                <h4><Link to="#">Maecenas pulvinar</Link></h4>
                                                <p>Nunc pulvinar augue non felis dictum ultricies. Donec lacinia, 
                                                    enim sit amet volutpat sodales, lorem velit fringilla metus, et
                                                    semper metus sapien non odio. Nulla facilisi.</p>
                                            </div>
                                            <div className="clearfix"> </div>
                                        </div>
                                        <div className="related-posts-grids">
                                            <div className="related-posts-grid">
                                                <Link to="#"><img src="images/6.jpg" alt=" " /></Link>
                                                <h4><Link to="#">Maecenas pulvinar</Link></h4>
                                                <p>Nunc pulvinar augue non felis dictum ultricies. Donec lacinia, 
                                                    enim sit amet volutpat sodale.</p>
                                            </div>
                                            <div className="related-posts-grid">
                                                <Link to="#"><img src="images/8.jpg" alt=" " /></Link>
                                                <h4><Link to="#">Maecenas pulvinar</Link></h4>
                                                <p>Nunc pulvinar augue non felis dictum ultricies. Donec lacinia, 
                                                    enim sit amet volutpat sodales.</p>
                                            </div>
                                            <div className="related-posts-grid">
                                                <Link to="#"><img src="images/5.jpg" alt=" " /></Link>
                                                <h4><Link to="#">Maecenas pulvinar</Link></h4>
                                                <p>Nunc pulvinar augue non felis dictum ultricies. Donec lacinia, 
                                                    enim sit amet volutpat sodale.</p>
                                            </div>
                                            <div className="related-posts-grid">
                                                <Link to="#"><img src="images/7.jpg" alt=" " /></Link>
                                                <h4><Link to="#">Maecenas pulvinar</Link></h4>
                                                <p>Nunc pulvinar augue non felis dictum ultricies. Donec lacinia, 
                                                    enim sit amet volutpat sodale.</p>
                                            </div>
                                            <div className="clearfix"> </div>
                                        </div>
                                    </div> */}
                                </div>
                                {/* <div className="categories">
                                    <div className="categ">
                                        <div className="cat">
                                            <h3>Categories</h3>
                                            <ul>
                                                <li><Link to="#">Lorem ipsum dolor sit amet</Link></li>
                                                <li><Link to="#">Consectetur adipiscing elit</Link></li>
                                                <li><Link to="#">Etiam aliquet convallis enim ut</Link></li>
                                                <li><Link to="#">Donec at pretium dui</Link></li>
                                                <li><Link to="#">Nulla sed massa sagittis venenatis</Link></li>
                                                <li><Link to="#">Praesent nec tortor nec massa</Link></li>
                                            </ul>
                                        </div>
                                        <div className="recent-com">
                                            <h3>Recent Comments</h3>
                                            <ul>
                                                <li><Link to="#">Donec consequat</Link> suscipit leo at accumsan. In hac habitasse platea dictumst.</li>
                                                <li><Link to="#">Aliquam erat ipsum,</Link> consequat id venenatis suscipit, venenatis sed leo.
                                                    Ut nec lacus in sem eleifend semper id ac dolor.</li>
                                                <li><Link to="#">Etiam aliquet convallis enim ut 
                                                        <span>Donec at pretium dui</span></Link></li>
                                                <li><Link to="#">Nulla sed massa sagittis</Link> venenatis Praesent nec tortor nec massa </li>
                                                <li><Link to="#">Donec faucibus mollis dolor
                                                    <span>in ullamcorper.</span></Link></li>
                                                <li><Link to="#">Aliquam erat ipsum,</Link> consequat id venenatis suscipit, venenatis sed leo.
                                                    Ut nec lacus in sem eleifend semper id ac dolor.</li>
                                                <li><Link to="#">Etiam aliquet convallis enim ut 
                                                        <span>Donec at pretium dui</span></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div> */}

                                <RecentPosts />

                                <div className="clearfix"> </div>
                                <div className="comments">
                                        <h4>Comments</h4>
                                        <div className="comments-info">
                                            <div className="cmnt-icon-left">
                                                <Link to="#"><img src={icon3} alt=""/></Link>
                                            </div>
                                            <div className="cmnt-icon-right">
                                                <p>MAY 13, 2015</p>
                                                <p><Link to="#">Admin</Link></p>
                                                <p className="cmmnt">
                                                    <Comments comments={state.comments} post_id={state.id} />
                                                </p>
                                            </div>
                                            <div className="clearfix"> </div>
                                            <div className="aliqua">
                                                <Link to="#">Reply</Link>
                                            </div>
                                        </div>
                                        <div className="comments-info">
                                            <div className="cmnt-icon-left">
                                                <Link to="#"><img src={icon3} alt=""/></Link>
                                            </div>
                                            <div className="cmnt-icon-right">
                                                <p>MAY 13, 2015</p>
                                                <p><Link to="#">Admin</Link></p>
                                                <p className="cmmnt">Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
                                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                            </div>
                                            <div className="clearfix"> </div>
                                            <div className="aliqua">
                                                <Link to="#">Reply</Link>
                                            </div>
                                        </div>
                                        <div className="comments-info">
                                            <div className="cmnt-icon-left">
                                                <Link to="#"><img src="images/icon3.png" alt=""/></Link>
                                            </div>
                                            <div className="cmnt-icon-right">
                                                <p>MAY 13, 2015</p>
                                                <p><Link to="#">Admin </Link></p>
                                                <p className="cmmnt">Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
                                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                            </div>
                                            <div className="clearfix"> </div>
                                            <div className="aliqua">
                                                <Link to="#">Reply</Link>
                                            </div>
                                        </div>
                                </div>
                                <div className="consequat">
                                    <h4>Leave Your Comment Here</h4>
                                    <form>
                                        <input type="text" value="Name" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Name';}" required="" />
                                        <input type="email" value="Email" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Email';}" required=""/>
                                        <input type="text" value="Subject" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Subject';}" required="" />
                                        <textarea type="text"  onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Message...';}" required="">Message...</textarea>
                                        <input type="submit" value="Submit" />
                                    </form>
                                </div>
            
            
                            </div>
                        </div>
                    </div> 
                );
            }else{
                let errorMsg = (state.errorMsg != '') ? state.errorMsg : 'An Error Occured';
                return(
                    <p className="alert alert-danger">{errorMsg}</p>
                );
            }
        }else{
            return (
                <h3>LOADING.....</h3>
            );
        } 
    }

    //if(state.loading==false && state.loaded==false) getPost();
    
    //console.log('user:', User);
    console.log('comments: ', location.state);

    

    return (
        <>
            <Header />
            {renderContent()}
            <Footer />
        
            {/* <Container>
                <PostContainer>
                    {renderContent()}
                </PostContainer>
                <About>
                  <RecentPosts />
                </About>
            </Container> */}
        </>
    );
}

export default FullBlogPost;
