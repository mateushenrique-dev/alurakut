import styled from "styled-components";
import Box from "../Box";

export const Profile = styled(Box)`
  .profileTitle {
    margin: 16px 0;
  }
  .profileBio {
    margin-bottom: 16px;
  }
  .profileFollowers {
    margin-right: 16px;
  }

  @media (min-width: 861px) {
    grid-template-columns: 1fr 1fr;
    display: grid;
    align-items: center;

    .profileImage {
      border-radius: 8px;
    }

    .profileTitle {
      grid-column: 1;
    }

    .profileFollowers {
      grid-column: 1;
      font-weight: 700;
    }

    .profileBlog {
      grid-column: 2;
    }

    .profileBio {
      grid-column: 1;
    }
  }
`;
