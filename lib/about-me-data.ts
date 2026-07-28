import { resolveThumbnail } from "./design-tokens"
import { personalData, stockPhotos, mediaVideos } from "./personal-data"

export const aboutMeData = {
  story: {
    title: "My Entrepreneurial Journey",
    subtitle: "From tech enthusiast to multi-venture founder",
    content: [
      {
        type: "image" as const,
        src: stockPhotos.headshot,
        alt: `${personalData.fullName} — professional headshot`,
        caption: "Founder & CEO across multiple ventures",
      },
      {
        type: "text" as const,
        content: personalData.longBio[0],
      },
      {
        type: "text" as const,
        content: personalData.longBio[1],
      },
      {
        type: "video" as const,
        src: mediaVideos[1].src,
        youtubeId: mediaVideos[1].youtubeId,
        title: mediaVideos[1].title,
        thumbnail: mediaVideos[1].thumbnail,
      },
      {
        type: "text" as const,
        content: personalData.longBio[2],
      },
      {
        type: "image" as const,
        src: stockPhotos.speaking,
        alt: `${personalData.fullName} speaking`,
        caption: "Sharing insights with founders and operators",
      },
      {
        type: "text" as const,
        content: personalData.longBio[3],
      },
      {
        type: "text" as const,
        content: personalData.longBio[4],
      },
    ],
  },
  ventures: [
    {
      id: "velantec",
      name: "VELANTEC",
      description:
        "Singapore parent company — strategy, design, communication & technology for digital brands. Home to MrAssistant, GrowthLab, ONESTOPSG, and more.",
      image: resolveThumbnail("velantec"),
      link: "https://www.velantec.com",
    },
    {
      id: "onestopsg",
      name: "ONESTOPSG",
      description:
        "Full-service marketing & social agency that engineers growth — Google & Meta Partner, serving Singapore & SEA since 2016.",
      image: resolveThumbnail("onestopsg"),
      link: "https://www.onestopsg.com",
    },
    {
      id: "avalsg",
      name: "Aval.sg",
      description: "E-commerce for authentic South Indian women's clothing in Singapore and beyond.",
      image: resolveThumbnail("avalsg"),
      link: "https://www.aval.sg",
    },
    {
      id: "avansg",
      name: "Avan.sg",
      description: "E-commerce for authentic South Indian men's clothing.",
      image: resolveThumbnail("avan"),
      link: "https://www.avan.sg",
    },
    {
      id: "growthlab",
      name: "GrowthLab",
      description:
        "Global startup ecosystem — LinkedIn for startups. 2,500+ members, funding tools, mentorship, and AI matching.",
      image: resolveThumbnail("growthlab"),
      link: "https://www.growthlab.sg",
    },
    {
      id: "mrassistant",
      name: "MrAssistant.Ai",
      description:
        "No-code AI voice agents for phone automation — 40+ languages, white-label, 250+ integrations.",
      image: resolveThumbnail("mrassistant"),
      link: "https://www.mrassistant.ai",
    },
  ],
  videos: mediaVideos.map((v) => ({
    id: v.id,
    title: v.title,
    description: v.description,
    thumbnail: v.thumbnail,
    src: v.src,
    youtubeId: v.youtubeId,
    duration: v.duration,
  })),
  gallery: [
    {
      id: "headshot-1",
      src: stockPhotos.headshot,
      alt: `Professional headshot of ${personalData.fullName}`,
      caption: "Professional Portrait",
      category: "portraits",
    },
    {
      id: "hero-1",
      src: stockPhotos.hero,
      alt: `${personalData.fullName} hero banner`,
      caption: "Hero Banner",
      category: "portraits",
    },
    {
      id: "speaking-1",
      src: stockPhotos.speaking,
      alt: `${personalData.fullName} speaking`,
      caption: "Speaking / Keynote",
      category: "events",
    },
    {
      id: "office-1",
      src: stockPhotos.office,
      alt: "Workspace",
      caption: "Workspace",
      category: "ventures",
    },
    {
      id: "team-1",
      src: stockPhotos.team,
      alt: "Team",
      caption: "With the team",
      category: "teams",
    },
    {
      id: "networking-1",
      src: stockPhotos.networking,
      alt: "Networking",
      caption: "Founder networking",
      category: "events",
    },
    {
      id: "casual-1",
      src: stockPhotos.casual,
      alt: "Casual portrait",
      caption: "Casual Portrait",
      category: "portraits",
    },
    {
      id: "award-1",
      src: stockPhotos.award,
      alt: "Award moment",
      caption: "Achievements",
      category: "achievements",
    },
    {
      id: "velantec-poster",
      src: resolveThumbnail("velantec"),
      alt: "VELANTEC",
      caption: "VELANTEC",
      category: "ventures",
    },
    {
      id: "onestopsg-poster",
      src: resolveThumbnail("onestopsg"),
      alt: "ONESTOPSG",
      caption: "ONESTOPSG",
      category: "ventures",
    },
    {
      id: "growthlab-poster",
      src: resolveThumbnail("growthlab"),
      alt: "GrowthLab",
      caption: "GrowthLab",
      category: "ventures",
    },
    {
      id: "mrassistant-poster",
      src: resolveThumbnail("mrassistant"),
      alt: "MrAssistant.Ai",
      caption: "MrAssistant.Ai",
      category: "ventures",
    },
  ],
  achievements: [
    {
      title: "1st Place – Project Exhibition",
      issuer: "Sri Sai Ram Polytechnic College",
      date: "2019",
      description: "Won first place in the college project exhibition for an innovative technical solution.",
      image: resolveThumbnail("sri-sai-ram-polytechnic-college"),
    },
    {
      title: "2nd Place – VRP Techno-Fest",
      issuer: "Technical Fest, Tamil Nadu",
      date: "2019",
      description: "Secured second place in a state-level technical festival competition.",
      image: resolveThumbnail("technical-fest"),
    },
    {
      title: "Gold Award – Inter-School Competition",
      issuer: "UG HQ, Singapore",
      date: "2015",
      description: "Received gold award in an inter-school competition organized by UG HQ, Singapore.",
      image: resolveThumbnail("ug-hq"),
    },
    {
      title: "National Youth Achievement Award",
      issuer: "Silver Medal, Singapore",
      date: "2014",
      description: "Awarded the National Youth Achievement Silver Medal for leadership and community service.",
      image: resolveThumbnail("silver-medal"),
    },
    {
      title: "Certificate of Merit",
      issuer: "Project Contest, Sri Sai Ram Group of Institutions",
      date: "2018",
      description: "Recognized for outstanding project work in the institutional project contest.",
      image: stockPhotos.award,
    },
    {
      title: "CAMP FORGE Certificate",
      issuer: "National Cadet Corps (NCC), Singapore",
      date: "2012",
      description: "Successfully completed the CAMP FORGE training program with the National Cadet Corps.",
      image: stockPhotos.networking,
    },
  ],
  facts: {
    basedIn: personalData.location.display,
    education: personalData.educationHighlight,
    focus: personalData.focusAreas,
    availability: personalData.availability,
    languages: personalData.languages,
  },
}
