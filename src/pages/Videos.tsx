import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  thumbnail: string;
  youtubeId: string;
}

const videos: VideoItem[] = [
  {
    id: "1",
    title: "Introduction to Indian Constitution",
    description: "Basics of the Indian Constitution and its importance.",
    category: "Basics",
    duration: "07:27",
    thumbnail: "https://img.youtube.com/vi/z-UzdY-pXTc/maxresdefault.jpg",
    youtubeId: "z-UzdY-pXTc"
  },
  {
    id: "2",
    title: "Features of Indian Constitution",
    description: "Key features like federalism, secularism, and democracy.",
    category: "Basics",
    duration: "24:05",
    thumbnail: "https://img.youtube.com/vi/JU3I3yBiObY/maxresdefault.jpg",
    youtubeId: "JU3I3yBiObY"
  },
  {
    id: "3",
    title: "The Preamble - Heart of Constitution",
    description:"Meaning and values of the Preamble explained.",
    category: "Basics",
    duration: "19:28",
    thumbnail: "https://img.youtube.com/vi/dXLpWXN8LuI/maxresdefault.jpg",
    youtubeId: "dXLpWXN8LuI"
  },
  {
    id: "4",
    title: "Historical Background",
    description: "Evolution of the Constitution from British rule.",
    category: "Basics",
    duration: "09:34",
    thumbnail: "https://img.youtube.com/vi/WuS_wbPix84/maxresdefault.jpg",
    youtubeId: "WuS_wbPix84&t"
  },
  {
    id: "5",
    title: "Fundamental rights explained",
    description: "Overview of rights guaranteed to citizens.",
    category: "Rights",
    duration: "15:21",
    thumbnail: "https://img.youtube.com/vi/pvbcJ7SkG8w/maxresdefault.jpg",
    youtubeId: "pvbcJ7SkG8w"
  },
  {
    id: "6",
    title: "Article 21 - Right to Life",
    description: "Right to life and personal liberty explained.",
    category: "Rights",
    duration: "08:08",
    thumbnail: "https://img.youtube.com/vi/SsF1AWjhBY4/maxresdefault.jpg",
    youtubeId: "SsF1AWjhBY4"
  },
  {
    id: "7",
    title: "Directive Principles of State Policy Explained",
    description: "Guidelines for governance and state policies.",
    category: "Rights",
    duration: "34:56",
    thumbnail: "https://img.youtube.com/vi/hqrxMqU8H9s/hqdefault.jpg",
    youtubeId: "hqrxMqU8H9s"
  },
  {
    id: "8",
    title: "Rights Vs Duties",
    description: "Difference between rights and duties.",
    category: "Rights",
    duration: "10:52",
    thumbnail: "https://img.youtube.com/vi/QRO3P0MnsOA/maxresdefault.jpg",
    youtubeId: "QRO3P0MnsOA"
  },
  {
    id: "9",
    title: "Women rights in Indian constitution",
    description: "Constitutional rights ensuring gender equality.",
    category: "Women's Rights",
    duration: "20:14",
    thumbnail: "https://img.youtube.com/vi/e63E7Geivs8/maxresdefault.jpg",
    youtubeId: "e63E7Geivs8"
  },
  {
    id: "10",
    title: "Laws Protecting Women in India",
    description: "Important laws safeguarding women in India.",
    category: "Women's Rights",
    duration: "18:59",
    thumbnail: "https://img.youtube.com/vi/40e9sFm9Nko/maxresdefault.jpg",
    youtubeId: "40e9sFm9Nko"
  },
  {
    id: "11",
    title: "Domestic violence Act Explained",
    description: "Protection against domestic abuse explained.",
    category: "Women's Rights",
    duration: "17:44",
    thumbnail: "https://img.youtube.com/vi/CekOrwMROVo/hqdefault.jpg",
    youtubeId: "CekOrwMROVo"
  },
  {
    id: "12",
    title: "Sexual Harrassment Law (POSH Act)",
    description: "Workplace safety under the POSH Act.",
    category: "Women's Rights",
    duration: "16:30",
    thumbnail: "https://img.youtube.com/vi/HGadR_YMFvk/maxresdefault.jpg",
    youtubeId: "HGadR_YMFvk"
  },
  {
    id: "13",
    title: "Kesavananda Bharati Case (Basic Structure)",
    description: "Introduced the Basic Structure Doctrine.",
    category: "Case Studies",
    duration: "17:17",
    thumbnail: "https://img.youtube.com/vi/yq9ouFOTAHc/maxresdefault.jpg",
    youtubeId: "yq9ouFOTAHc"
  },
  {
    id: "14",
    title: "Maneka Gandhi Case (Article 21 Expansion)",
    description: "Expanded scope of Article 21.",
    category: "Case Studies",
    duration: "18:04",
    thumbnail: "https://img.youtube.com/vi/cQQHv7mzvHU/maxresdefault.jpg",
    youtubeId: "cQQHv7mzvHU"
  },
  {
    id: "15",
    title: "Vishaka Case (Women Safety)",
    description: "Guidelines for workplace safety of women.",
    category: "Case Studies",
    duration: "17:54",
    thumbnail: "https://img.youtube.com/vi/8fWRL7TZMQg/maxresdefault.jpg",
    youtubeId: "8fWRL7TZMQg"
  },
  {
    id: "16",
    title: "S.R. Bommai Case (President Rule)",
    description: "Limits on misuse of President's Rule.",
    category: "Case Studies",
    duration: "24:47",
    thumbnail: "https://img.youtube.com/vi/7j1IsqkM2GA/maxresdefault.jpg",
    youtubeId: "7j1IsqkM2GA"
  }  
];

const categories = ["All", "Basics", "Rights", "Women's Rights", "Case Studies"];

const Videos = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredVideos =
  selectedCategory === "All"
    ? videos
    : videos.filter(
        (video) => video.category === selectedCategory
      );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Basics":
        return "bg-accent/10 text-accent";
      case "Rights":
        return "bg-green-india/10 text-green-india";
      case "Women's Rights":
        return "bg-destructive/10 text-destructive";
      case "Case Studies":
        return "bg-gold/10 text-gold";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            🎬 Video Learning
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch engaging videos about the Constitution, your rights, and landmark cases.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="cursor-pointer transition-colors px-4 py-2"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="overflow-hidden hover-lift group">
              <div className="relative aspect-video bg-muted overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/640x360/1a1a2e/ffffff?text=Video';
                  }}
                />
                <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="gap-2 shadow-lg">
                      <Play className="w-5 h-5" />
                      Watch Now
                    </Button>
                  </a>
                </div>
                <Badge className="absolute top-2 right-2 bg-background/80 text-foreground">
                  {video.duration}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className={getCategoryColor(video.category)}>
                    {video.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-2">{video.description}</CardDescription>
                <a
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-3"
                >
                  Watch on YouTube
                  <ExternalLink className="w-3 h-3" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Videos;
