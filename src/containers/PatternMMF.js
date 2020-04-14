import React from 'react';
import { Container, Row, Col, Card, Button, Modal, ModalBody, ModalFooter, ListGroup, ListGroupItem, Form, FormGroup, Label, Input } from 'reactstrap';
import ImageViewer from 'components/ImgViewer';

import imgDownload from 'static/img/download.svg';

const { ipcRenderer } = window.require('electron');
const base64Img = window.require('base64-img');
const Jimp = window.require('jimp');

class PatternMMF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      silhouetteList: [],
      isModal: false,
      silhouetteId: 0,
      isSettingModal: false
    };
  }

  componentDidMount() {
    const res = ipcRenderer.sendSync('fba-get-silhouettes');
    this.setState({
      silhouetteList: res
    });
  }

  onSelectSilhouette = idx => {
    this.setState({
      silhouetteId: idx,
      isModal: false
    });
  };

  toggle = () => {
    const { isModal } = this.state;
    this.setState({
      isModal: !isModal
    });
  };

  getlength(c) {
    var b = 0,
      a;
    console.log(c);
    for (a in c) {
      if (c.hasOwnProperty(a)) {
        b++;
      }
    }
    return b;
  }

  createrawpattern(j, q, h) {
    function o(m) {
      if (m === 255) {
        return true;
      }
      return false;
    }

    function g(m) {
      if (m === 0) {
        return true;
      }
      return false;
    }
    var i = new Object();
    for (var p = 0, d = q; p < d; p += 1) {
      i[p] = [];
      for (var l = 0, e = h; l < e; l += 1) {
        i[p][l] = j[(p + l * q) * 4];
      }
    }
    var a = new Object();
    var p, l, c, k, b, f;
    for (p = 0, d = q; p < d; p += 1) {
      l = 0;
      c = null;
      a[p] = new Array();
      while (l < h) {
        k = i[p][l];
        while (g(k) && l < h) {
          if (o(c) || c === null) {
            b = l;
          }
          if (l == h - 1) {
            f = l + 1;
            a[p].push([b, f]);
          }
          l += 1;
          c = k;
          if (l < h) {
            k = i[p][l];
          }
        }
        while (o(k) && l < h) {
          if (g(c)) {
            f = l - 1;
            a[p].push([b, f]);
          }
          l += 1;
          c = k;
          if (l < h) {
            k = i[p][l];
          }
        }
      }
    }
    return a;
  }

  checkrawpattern(c) {
    var g = '';
    var a = 0;
    var e = false;
    var d = false;
    var f = false;
    console.log('checkrawpattern');
    console.log(c);
    var b = this.getlength(c);
    while (a < b) {
      if (c[a].length > 5) {
        e = true;
        g =
          'Your picture has an awful lot of detail! This results in more than 5 alternating folds in some area(s). Please reduce the details in your picture and call this program again.';
        break;
      }
      if (!e && c[a].length == 0) {
        a += 1;
        continue;
      }
      if (!e && c[a].length != 0) {
        e = true;
        a += 1;
        continue;
      }
      if (e && c[a].length != 0 && !d) {
        a += 1;
        continue;
      }
      if (e && c[a].length == 0 && !d) {
        d = true;
        a += 1;
        continue;
      }
      if (e && c[a].length == 0 && d) {
        a += 1;
        continue;
      }
      if (e && c[a].length != 0 && d) {
        g =
          'Sorry, but your picture has vertical gaps (like space between letters, for example: <a href="/posts/2018/May/prepare_bookart_text.html">learn how to get rid of it here</a>) in it, this won\'t look good!\nPlease use a different picture!';
        break;
      }
    }
    if (e == false) {
      g += 'Ooops - you gave me a picture which is only white (or has too little contrast)!';
    }
    if (g) {
      console.log(g);
      // print_error(g, 'errorbox');
      return false;
    }
    return true;
  }

  smootherawpattern(a, i) {
    var f = new Object();
    var g, b, d, c, k, j;
    var h = [];
    var e = this.getlength(a);
    for (let x = 0, n = e; x < n; x += 1) {
      h = [];
      g = false;
      if (a[x].length > 1) {
        for (j = 0; j < a[x].length - 1; j += 1) {
          if (!g) {
            b = a[x][j][0];
          }
          d = a[x][j][1];
          c = a[x][j + 1][0];
          if (c - d < i) {
            d = a[x][j + 1][1];
            g = true;
            if (i > 0) {
              k =
                "Smoothed one or more folds, because the distance between one dark area and the dark area below it was shorter than the selected smoothing value. Please check the pattern thoroughly for correctness. If it looks wrong, try to use a better picture, or try to enter different values for page numbers. If the tiny gaps are intentional, then don't use smoothing.)";
            }
          } else {
            h.push([b, d]);
            g = false;
          }
          if (j == a[x].length - 2) {
            if (g == false) {
              h.push([a[x][j + 1][0], a[x][j + 1][1]]);
            } else {
              h.push([b, d]);
            }
          }
        }
      } else {
        h = a[x].slice();
      }
      f[x] = h.slice();
    }
    if (k) {
      console.log(k);
      // print_error(k, 'errorbox');
      console.log('errorbox');
    }
    return f;
  }

  createalternatingpattern(c) {
    var a = new Array();
    var b = this.getlength(c);
    var d;
    for (let x = 0, n = b; x < n; x += 1) {
      d = c[x];
      let num_bands = d.length;
      if (num_bands == 0) {
        a[x] = [];
      } else {
        if (num_bands == 1) {
          a[x] = d[0].slice();
        } else {
          a[x] = d[x % num_bands].slice();
        }
      }
    }
    return a;
  }

  createpatterntext(a, entries) {
    let b =
      'Book Folding Art Pattern for "' +
      entries.projectname +
      '"\n==============================================================================\n\nInstructions:\nThese measurements describe where you will have to fold the pages of your book.\nAll measurements are given in cm/inch, whichever you chose at the beginning.\nThe first number indicates the page number, the second tells you where\n(measured from the top of the book) you have to fold the upper corner down,\nthe third tells you where you will have to fold the lower corner up.\n\n Page     Top Fold     Bottom Fold\n==========================================\n\n';
    for (let x = 0, n = entries.numsheets; x < n; x++) {
      let page = x * 2 + entries.firstpage;
      let page_formatted = ('      ' + page.toString()).slice(-4);
      if (a[x][0] == 0 && a[x][1] == entries.bookheight) {
        b += page_formatted + '              No folds.\n';
      } else {
        if (a[x].length == 0) {
          b += page_formatted + '        Fold back completely.\n';
        } else {
          let uppercorner = a[x][0] / 100;
          let lowercorner = a[x][1] / 100;
          if (entries.singleprecision == true) {
            uppercorner = uppercorner.toFixed(1);
            lowercorner = lowercorner.toFixed(1);
          } else {
            uppercorner = uppercorner.toFixed(2);
            lowercorner = lowercorner.toFixed(2);
          }
          uppercorner = ('      ' + uppercorner).slice(-7);
          lowercorner = ('      ' + lowercorner).slice(-7);
          b += page_formatted + '     ' + uppercorner + '        ' + lowercorner + '\n';
        }
      }
      if (page % 10 == 0) {
        b += '------------------------------------------\n';
      }
    }
    b += '\n\n\nThis Book Art pattern was created using the free BookArtGenerator service at:\n';
    b += 'http://blog.vektorrascheln.de/bookart-generator.html\n\n';
    b += 'As the author of the open source service, I would be very happy to see your cool creations!\n';
    b += 'Please send me a mail with a photo (licensed under CC-By-SA 4.0, allowing to show the\n';
    b += 'photo on the website, to modify it if necessary, always quoting you as the originator,\n';
    b += 'allowing commercial use) to moini@goos-habermann.de.\n\n';
    b += '------------  HAVE FUN FOLDING :-)  ------------ !\n\n';
    console.log(b);
  }

  drawPreview(e, c, entries) {
    var d = 18;
    let canvas = document.getElementById('patternimage');
    let ctx = canvas.getContext('2d');
    canvas.width = e.length * 6 + 2 * d;
    canvas.height = c + 50;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.fillStyle = 'black';
    ctx.font = '18px Arial';
    ctx.textAlign = 'center';
    for (var b = 0; b < e.length; b++) {
      if ((b + entries.firstpage / 2) % 10 == 0) {
        ctx.strokeStyle = 'Thistle';
      } else {
        ctx.strokeStyle = 'gainsboro';
      }
      ctx.beginPath();
      ctx.moveTo(b * 6 + d, 0);
      ctx.lineTo(b * 6 + d, c);
      ctx.stroke();
    }
    for (var b = 0; b < e.length; b++) {
      if ((b + entries.firstpage / 2) % 10 == 0) {
        ctx.strokeStyle = 'PaleVioletRed';
      } else {
        ctx.strokeStyle = 'dimgray';
      }
      ctx.beginPath();
      ctx.moveTo(b * 6 + d, e[b][0]);
      ctx.lineTo(b * 6 + d, e[b][1]);
      ctx.stroke();
    }
    for (var b = 0; b < e.length; b++) {
      var a = b * 2 + entries.firstpage;
      if (a % 20 == 0) {
        ctx.fillText(a, b * 6 + d, canvas.height - 30);
      }
    }
    ctx.fillText('Print this picture with a height of ' + canvas.height / 100 + ' ' + entries.unit + '.', canvas.width / 2, canvas.height - 5);
  }

  toggleSetting = async () => {
    let entries = {
      projectname: 'My Book Art Project',
      firstpage: 2,
      lastpage: 300,
      cm: '',
      inch: '',
      bookheight: 1500,
      singleprecision: false,
      smoothe: '0',
      unit: 'cm',
      userimage: '',
      numsheets: 149
    };
    let silhouetteFound = '';
    const { isSettingModal, silhouetteId, silhouetteList } = this.state;
    if (silhouetteId > 0) {
      silhouetteFound = silhouetteList.find(element => element.id === silhouetteId);
    }
    let image = await Jimp.read(silhouetteFound.path);
    const width = 149;
    const height = 1500;
    image.resize(width, height);

    var j = image.bitmap.data;
    console.log(j);
    let c, d, l, k, g;
    for (var f = 0, b = j.length; f < b; f += 4) {
      c = j[f];
      d = j[f + 1];
      l = j[f + 2];
      let alpha = j[f + 3];
      if (alpha != 0) {
        if (alpha != 255) {
          var a = alpha / 255;
          var e = (1 - a) * 255;
          c = a * c + e;
          d = a * d + e;
          l = a * l + e;
        }
        k = (c * 299 + d * 587 + l * 114) / 1000;
      } else {
        k = 255;
      }
      g = 128;
      if (k >= g) {
        j[f] = 255;
        j[f + 1] = 255;
        j[f + 2] = 255;
      } else {
        j[f] = 0;
        j[f + 1] = 0;
        j[f + 2] = 0;
      }
      j[f + 3] = 255;
    }

    c = this.createrawpattern(j, width, height);
    if (this.checkrawpattern(c)) {
      var ds = this.smootherawpattern(c, entries.smoothe);
      var a = this.createalternatingpattern(ds);
      if (a) {
        this.createpatterntext(a, entries);
        this.drawPreview(a, entries.bookheight, entries);
      }
    }

    let canvas = document.getElementById('patternimage');
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let newImage = new Jimp({ data: imgData.data, width: imgData.width, height: imgData.height }, (err, image) => {});
    // newImage.write('d:/res.png');
    //console.log(base64Img.base64Sync(silhouetteFound.path));
    this.setState({
      isSettingModal: !isSettingModal
    });
  };

  render() {
    const imgCard = imgDownload;
    let silhouetteFound = '';
    const { isModal, silhouetteList, silhouetteId, isSettingModal } = this.state;
    if (silhouetteId > 0) {
      silhouetteFound = silhouetteList.find(element => element.id === silhouetteId);
    }

    const silhouetteListData = silhouetteList.map((silhouette, idx) => (
      <ListGroupItem align="left" key={idx} onClick={id => this.onSelectSilhouette(silhouette.id)}>
        <div style={{ float: 'left' }}>
          <ImageViewer path={silhouette.path} width={silhouette.width} height={silhouette.height} size={65} alt="item" />
        </div>
        <div className="silhouette-list-name">{silhouette.name}</div>
      </ListGroupItem>
    ));

    return (
      <div>
        <Container>
          <Row style={{ marginTop: '20vh' }}>
            <Col sm="4" />
            <Col sm="4">
              <Card className="pattern-card" onClick={this.toggle}>
                {silhouetteId > 0 ? (
                  <ImageViewer
                    path={silhouetteFound.path}
                    width={silhouetteFound.width}
                    height={silhouetteFound.height}
                    size={150}
                    alt="Selected Silhouette"
                    style={{ margin: 'auto' }}
                  />
                ) : (
                  <div style={{ margin: 'auto' }}>
                    <div>
                      <img src={imgCard} style={{ width: '57px' }} alt="Selected Silhouette" />
                    </div>
                    <div>
                      <h4>Select an image</h4>
                    </div>
                  </div>
                )}
              </Card>
            </Col>
            <Col sm="4" />
          </Row>
          <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
            <Col sm="4" />
            <Col sm="4">
              <Button color="success" size="md" onClick={this.toggleSetting} disabled={silhouetteId === 0}>
                Create Pattern
              </Button>
            </Col>
            <Col sm="4" />
          </Row>
          <Row>
            <div class="canvaswrapper">
              <canvas
                title="Preview for your pattern, each light grey line corresponds to one sheet of paper in the book. The darker lines are the parts that will stick out after folding."
                id="patternimage"
              >
                <p>Your browser does not support the canvas element. Please use a modern browser for this web page.</p>
              </canvas>
            </div>
          </Row>
        </Container>

        <Modal isOpen={isModal} centered>
          <ModalBody>
            <ListGroup style={{ height: '400px' }} className="overflow-auto ">
              {silhouetteListData}
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button className="btn-secondary btn-sm" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={isSettingModal} centered>
          <ModalBody>
            <FormGroup row>
              <Label for="exampleEmail" sm={5}>
                Book Art Project Name:
              </Label>
              <Col sm={7}>
                <input type="text" className="fba-input" name="email" id="exampleEmail" placeholder="with a placeholder" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={5}>
                Book Art Project Name:
              </Label>
              <Col sm={7}>
                <input type="email" className="fba-input" name="email" id="exampleEmail" placeholder="with a placeholder" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={5}>
                Book Art Project Name:
              </Label>
              <Col sm={7}>
                <input type="email" className="fba-input" name="email" id="exampleEmail" placeholder="with a placeholder" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={5}>
                Book Art Project Name:
              </Label>
              <Col sm={7}>
                <input type="email" className="fba-input" name="email" id="exampleEmail" placeholder="with a placeholder" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={5}>
                Book Art Project Name:
              </Label>
              <Col sm={7}>
                <input type="email" className="fba-input" name="email" id="exampleEmail" placeholder="with a placeholder" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={5}>
                Book Art Project Name:
              </Label>
              <Col sm={7}>
                <input type="email" className="fba-input" name="email" id="exampleEmail" placeholder="with a placeholder" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={5}>
                Book Art Project Name:
              </Label>
              <Col sm={7}>
                <input type="email" className="fba-input" name="email" id="exampleEmail" placeholder="with a placeholder" />
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button className="btn-secondary btn-sm" onClick={this.toggleSetting}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default PatternMMF;
