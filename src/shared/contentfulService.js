import { createClient } from "contentful";

const client = createClient({
  space: "g9nxaw4s9m72",
  environment: "master", // defaults to 'master' if not set
  accessToken: "Hl3C7WH5wUI6Gn5MszrkJQXNg6iM8Ns_brWRlzGu42Q",
});

const getContent = async (contentType) => {
  try {
    const response = await client.getEntries({
      content_type: contentType,
    });
    return response.items;
  } catch (error) {
    console.error("Error fetching content from Contentful:", error);
    return [];
  }
};

export default getContent;
