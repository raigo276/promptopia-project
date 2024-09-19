'use client'

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"
import { set } from "mongoose"

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}


    </div>
  )
}

const Feed = () => {  
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      console.log(data);
      setPosts(data);
      setFilteredPosts(data);
    }
      fetchPosts();
    }, []);

    const filterPrompts = (searchText) => {
      const regex = new RegExp(searchText, "i");
      return posts.filter(
        (item) =>
          regex.test(item.creator.username) ||
          regex.test(item.tag) ||
          regex.test(item.prompt)
      );
    };

    const handleSearchChange = (e) => {
      const value = e.target.value;
      setSearchText(value);
  
      // Debounce search
      setSearchTimeout(
        setTimeout(() => {
          const searchResult = filterPrompts(e.target.value);
          setFilteredPosts(searchResult);
        }, 500)
      );
    };

    const handleTagClick = (tagName) => {
      setSearchText(tagName);
  
      const searchResult = filterPrompts(tagName);
      setFilteredPosts(searchResult);
    };
  

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" 
          placeholder="Search for a tag or an username"
          value={searchText} 
          onChange={handleSearchChange}
          required
          className="search_input peer"
          />
      </form>
      {searchText ? (
        <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}

    </section> 
  )
}

export default Feed